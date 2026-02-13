import { useSearchParams } from "react-router-dom";

export const useHomeTusks = (tusks, setTusks) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const statusFilter = searchParams.get("status") || "all";

  const filteredTusks = tusks.filter((tusk) => {
    if (statusFilter === "completed") return tusk.completed;
    if (statusFilter === "active") return !tusk.completed;
    return true;
  });

  const totalTusks = tusks.length;
  const completedCount = tusks.filter((tusk) => tusk.completed).length;

  const handleFilterChange = (event, newStatus) => {
    if (newStatus !== null) {
      setSearchParams({ status: newStatus });
    }
  };

  const toggleStatus = (id) => {
    setTusks((prev) =>
      prev.map((tusk) =>
        tusk.id === id ? { ...tusk, completed: !tusk.completed } : tusk,
      ),
    );
  };

  return {
    statusFilter,
    filteredTusks,
    totalTusks,
    completedCount,
    handleFilterChange,
    toggleStatus,
  };
};
