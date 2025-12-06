"use client";
import React from "react";

function MainComponent() {
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "" });

  const { data: user } = useUser();
  const params = new URLSearchParams(window.location.search);
  const groupId = params.get("id");

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  const fetchGroupDetails = async () => {
    try {
      const response = await fetch("/api/groups/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch group details");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGroup(data.group);
      setMembers(data.members);
      setSessions(data.sessions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/groups/members/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          ...newMember,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add member");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMembers([...members, data.member]);
      setShowAddMemberModal(false);
      setNewMember({ name: "", email: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-center">
          <div className="text-xl text-gray-600">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-center">
          <div className="text-xl text-gray-600">Groupe non trouvé</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{group.description}</p>
            </div>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Ajouter un membre
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Membres</h2>
            <div className="mt-4 space-y-4">
              {members.map((member) => (
                <div key={member.id} className="rounded-lg bg-white p-4 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(member.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Sessions planifiées
            </h2>
            <div className="mt-4 space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-lg bg-white p-4 shadow"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {session.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(session.scheduled_for).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Durée: {session.duration_minutes} minutes
                  </p>
                  {session.meeting_link && (
                    <a
                      href={session.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Lien de la réunion
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showAddMemberModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <form onSubmit={handleAddMember}>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Ajouter un nouveau membre
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      required
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember({ ...newMember, name: e.target.value })
                      }
                      placeholder="Nom du membre"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={newMember.email}
                      onChange={(e) =>
                        setNewMember({ ...newMember, email: e.target.value })
                      }
                      placeholder="Email"
                      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;