"use client";
import React from "react";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [groups, setGroups] = useState([]);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [newSession, setNewSession] = useState({
    title: "",
    scheduledFor: "",
    durationMinutes: 60,
    meetingLink: "",
  });

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/groups/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGroups(data.groups);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/groups/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newGroup,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGroups([...groups, data.group]);
      setShowNewGroupModal(false);
      setNewGroup({ name: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/groups/sessions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSession,
          groupId: selectedGroup.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setShowNewSessionModal(false);
      setNewSession({
        title: "",
        scheduledFor: "",
        durationMinutes: 60,
        meetingLink: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-center">
          <div className="text-xl text-gray-600">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-xl text-gray-600">
            Veuillez vous connecter pour accéder au tableau de bord
          </div>
          <a
            href="/account/signin"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord
            </h1>
            <button
              onClick={() => setShowNewGroupModal(true)}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Créer un groupe
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900">
                {group.name}
              </h2>
              <p className="mt-2 text-gray-600">{group.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {group.member_count} membres
                </span>
                <button
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowNewSessionModal(true);
                  }}
                  className="rounded bg-indigo-100 px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-200"
                >
                  Planifier une session
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showNewGroupModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <form onSubmit={handleCreateGroup}>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Créer un nouveau groupe
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      required
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                      placeholder="Nom du groupe"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <textarea
                      name="description"
                      value={newGroup.description}
                      onChange={(e) =>
                        setNewGroup({
                          ...newGroup,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Créer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showNewSessionModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <form onSubmit={handleCreateSession}>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Planifier une nouvelle session
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      required
                      value={newSession.title}
                      onChange={(e) =>
                        setNewSession({ ...newSession, title: e.target.value })
                      }
                      placeholder="Titre de la session"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                      type="datetime-local"
                      name="scheduledFor"
                      required
                      value={newSession.scheduledFor}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          scheduledFor: e.target.value,
                        })
                      }
                      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                      type="number"
                      name="durationMinutes"
                      required
                      value={newSession.durationMinutes}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          durationMinutes: parseInt(e.target.value),
                        })
                      }
                      placeholder="Durée (minutes)"
                      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                      type="url"
                      name="meetingLink"
                      value={newSession.meetingLink}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          meetingLink: e.target.value,
                        })
                      }
                      placeholder="Lien de la réunion (optionnel)"
                      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Planifier
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