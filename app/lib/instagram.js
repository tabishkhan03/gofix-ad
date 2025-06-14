// lib/instagram.js
export const getInstagramUsername = async (userId) => {
    const token = process.env.GOFIX_IG_TOKEN;
    const url = `https://graph.instagram.com/v23.0/${userId}?fields=username,name&access_token=${token}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      console.log(`🔍 IG Graph response for user ${userId}:`, data);
  
      return {
        username: data.username || null,
        name: data.name || null,
      };
    } catch (err) {
      console.error(`❌ Error fetching username for user ${userId}:`, err);
      return { username: null, name: null };
    }
  };
  
  