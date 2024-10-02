const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-48 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};
export default Skeleton;
