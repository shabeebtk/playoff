import React from 'react';

const GamesCardSkeleton = () => {
  return (
    <div>
      <div className="border relative grid grid-cols-12 p-3 pl-5 pr-12 items-center rounded-md shadow-sm mb-4 animate-pulse">
        <div className="flex gap-4 items-center col-span-6">
          <div className="flex flex-col justify-center items-center space-y-2">
            <div className="h-[115px] w-[115px] rounded-full bg-gray-200 "></div>
          </div>
          <div className="w-20">
            <div className="flex gap-3 items-center  mb-1">
              <div className="w-20 bg-gray-200 h-4 rounded-md animate-pulse mb-1"></div>
            </div>
            <div className="flex gap-3 items-center mb-1">
              <div className="w-20 bg-gray-200 rounded-md h-3 mb-1"></div>
            </div>
            <div className="flex gap-3 items-center mb-1">
              <div className="w-5/6 bg-gray-200 rounded-md h-3 mb-1"></div>
            </div>
            <div className="flex gap-3 mb-1 items-center">
              <div className="w-5/6 bg-gray-200 rounded-md h-3 mb-1"></div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-5/6 bg-gray-200 rounded-md h-3 mb-1"></div>
            </div>
          </div>
        </div>

        <div className="col-span-4 animate-pulse">
          <div className="flex flex-col items-center mb-1">
            <div className="w-1/2 bg-gray-200 rounded-md h-3 mb-1"></div>
            <div className="w-1/2 bg-gray-200 rounded-md h-3"></div>
          </div>
        </div>

        <div className="col-span-2 flex gap-2 animate-pulse">
          <div className="w-1/4 bg-gray-200 rounded-md h-8"></div>
          <div className="w-3/4 bg-gray-200 rounded-md h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default GamesCardSkeleton;
