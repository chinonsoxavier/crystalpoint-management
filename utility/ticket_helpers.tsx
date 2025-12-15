// utils/ticketHelpers.ts
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-600/20 text-red-600";
    case "high":
      return "bg-red-500/20 text-red-500";
    case "medium":
      return "bg-yellow-500/20 text-yellow-500";
    case "low":
      return "bg-green-500/20 text-green-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-blue-500/20 text-blue-500";
    case "in_progress":
      return "bg-yellow-500/20 text-yellow-500";
    case "resolved":
      return "bg-green-500/20 text-green-500";
    case "closed":
      return "bg-gray-500/20 text-gray-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};
