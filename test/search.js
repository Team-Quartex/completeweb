function getTopWords() {
    var wordFrequency = {}; // Use an object to track frequencies
  
    // Count word frequency
    window.postsArray.forEach(post => {
        const words = post.description
            .toLowerCase()
            .split(/\s+/) // Split by whitespace
            .filter(word => Boolean(word) && !enflishremove.includes(word) && isNaN(word)); // Exclude common words
  
        // Remove duplicates by converting to a Set, then back to an array
        const uniqueWords = [...new Set(words)];
  
        // Count frequencies of unique words
        uniqueWords.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });
    });
  
    // Convert to array, sort by frequency, and extract words
    const sortedWords = Object.entries(wordFrequency)
        .sort(([, a], [, b]) => b - a) // Sort by frequency (descending)
        .map(([word]) => word); // Extract the word
  
    // Map sorted words to an object with 'id', 'name', 'image', and 'content'
    const mappedWords = sortedWords.map((word, index) => {
        return {
            id: 'p', // Generate a unique id based on the index (or use another method for unique IDs)
            name: word,  // The word itself
            image: `https://via.placeholder.com/50?text=${word.charAt(0).toUpperCase()}`, // Image placeholder (using the first letter of the word)
            content: `This is content related to the word "${word}"` // Example content (you can replace this with actual content)
        };
    });
  
    return mappedWords; // Return array of objects with id, name, image, and content
  }
  
  
  function getProfilesWithMostPosts() {
    // Step 1: Create a map to count posts by userId
    const profileCount = {};
  
    window.postsArray.forEach(post => {
        const { userId, name, profilePic } = post; // Ensure correct property names
  
        // Initialize profile if not yet added to the map
        if (!profileCount[userId]) {
            profileCount[userId] = {
                name,          // Store name
                profilePic,    // Store profile image
                userId,        // Store userId
                postCount: 0,   // Initialize post count
            };
        }
  
        // Increment post count for this userId
        profileCount[userId].postCount++;
    });
  
    // Step 2: Convert the map into an array of profiles
    const profileArray = Object.values(profileCount);
  
    // Step 3: Sort by post count in descending order
    profileArray.sort((a, b) => b.postCount - a.postCount);
  
    // Step 4: Map to the desired format
    const result = profileArray.map(profile => ({
        id: profile.userId,        // Use userId as the id
        name: profile.name,        // Correctly use name from post
        image: profile.profilePic, // Correctly use profilePic from post
        content:"total post : " + profile.postCount, // Optional: Keep post count for reference
    }));
  
    console.log(result); // Debugging: Check the result
    return result;
  }