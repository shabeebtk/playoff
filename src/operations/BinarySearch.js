export const binarySearch = (sortedArray, searchQuery) => {
    let start = 0;
    let end = sortedArray.length - 1;
  
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const cityName = sortedArray[mid].toLowerCase();
  
      if (cityName.startsWith(searchQuery)) {
        let left = mid;
        while (left >= 0 && sortedArray[left].toLowerCase().startsWith(searchQuery)) {
          left--;
        }
  
        let right = mid;
        while (right < sortedArray.length && sortedArray[right].toLowerCase().startsWith(searchQuery)) {
          right++;
        }
  
        return sortedArray.slice(left + 1, right).slice(0, 6);
      } else if (cityName < searchQuery) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  
    return [];
  };

