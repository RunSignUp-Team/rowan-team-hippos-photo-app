import useGoogleAuthentication from "./YouTube";
import React, { useState } from 'react';

const API_KEY = "AIzaSyDozcEMBZR6xxoUcClpbVa1jwSeJ7dlgIg";

const useLiveStream = () => {
    const { userInfo, promptGoogleSignIn } = useGoogleAuthentication();
    const [liveStream, setLiveStream] = useState(null);

    const createLiveBroadcast = async () => {
        if (!userInfo) {
            await promptGoogleSignIn();
        }

        const liveBroadcastsCreateUrl = `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,contentDetails,status&key=${YOUR_API_KEY}`;
        const broadcastDetails = {
            snippet: {
                title: "Test Live Stream",
                scheduledStartTime: "2024-04-29T00:00:00Z", // Test start time
            },
            status: {
                privacyStatus: "private",
            },
        };

        try {
            const response = await fetch(liveBroadcastsCreateUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userInfo.token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(broadcastDetails),
            });

            const data = await response.json();
            setLiveStream(data);
            console.log("Live broadcast created:", data);
        } catch (error) {
            console.error("Error creating live broadcast:", error);
        }
    };

    return { liveStream, createLiveBroadcast };
};

export default useLiveStream;

