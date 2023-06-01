import React from 'react'

const loading = () => {
  return (
    <div role="status" class=" m-auto mt-20 max-w-sm lg:max-w-xl p-4 animate-pulse md:p-6 dark:border-gray-700">
    <div class="flex items-center justify-center h-48 mb-4 rounded dark:bg-[#131B21]">
    </div>
    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-[#131B21] mb-4 w-40"></div>
   <div class="h-2 bg-gray-200 rounded-full dark:bg-[#131B21] mb-2.5"></div>
  </div> 
  )
}

export default loading