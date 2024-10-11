import React, { useState, useEffect, useCallback } from "react";
import { db, auth } from "./FirebaseConfig";
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from "firebase/firestore";
import UserSearch from "./UserSearch";



function Sidebar({ onSelectConversation, onSelectUser, currentUserRole }) {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);
  const [usernames, setUsernames] = useState({}); // State to store usernames for UIDs

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadConversations(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // Define the loadConversations function using useCallback to prevent unnecessary re-renders
  const loadConversations = useCallback(
    (userId) => {
      const conversationsRef = collection(db, "conversations");
      const q = query(
        conversationsRef,
        where("participants", "array-contains", userId),
        orderBy("latestMessageTimestamp", "desc") // Order by latest message timestamp in descending order
      );

      onSnapshot(q, async (snapshot) => {
        const conversationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          formattedTime: doc.data().latestMessageTimestamp
            ? formatTimestamp(doc.data().latestMessageTimestamp.toDate())
            : "", // Format the timestamp to display time
        }));

        setConversations(conversationsData);

        // Fetch usernames for each participant and store them in the `usernames` state
        const userUIDs = new Set();
        conversationsData.forEach((conversation) => {
          conversation.participants.forEach((participant) => {
            if (!usernames[participant]) {
              userUIDs.add(participant);
            }
          });
        });

        const usernameMap = { ...usernames };
        await Promise.all(
          Array.from(userUIDs).map(async (uid) => {
            const userRef = doc(db, "users", uid);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
              usernameMap[uid] = userSnapshot.data().displayName || uid;
            }
          })
        );

        setUsernames(usernameMap); // Update state with fetched usernames
      });
    },
    [usernames]
  );

  // Helper function to format the timestamp to HH:mm
  const formatTimestamp = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div style={{ width: "300px", borderRight: "1px solid #ccc", padding: "10px", display: "flex", flexDirection: "column" }}>
      {/* User Search on top of Sidebar */}
      <UserSearch onSelectUser={onSelectUser} currentUserRole={currentUserRole} />

      {/* Conversation List */}
      <h3>Your Conversations</h3>
      <ul style={{ listStyle: "none", padding: 0, overflowY: "scroll", flex: 1 }}>
        {conversations.map((conv) => (
          <li
            key={conv.id}
            style={{ cursor: "pointer", padding: "10px", borderBottom: "1px solid #eee" }}
            onClick={() => onSelectConversation(conv.id)}
          >
            {/* Display usernames and the formatted time */}
            <div>
              <span style={{ fontWeight: "bold" }}>
                {conv.participants
                  .filter((p) => p !== user?.uid) // Exclude the current user from the displayed participants
                  .map((participant) => usernames[participant] || participant) // Map UIDs to usernames
                  .join(", ")}
              </span>
              {/* Show the formatted time for the latest message */}
              {conv.formattedTime && (
                <span style={{ marginLeft: "10px", color: "#757575" }}>({conv.formattedTime})</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;