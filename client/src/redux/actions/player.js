export const UPDATE_PLAYER = "UPDATE_PLAYER";

export const updatePlayer = (audioId, audioType) => ({
    type: UPDATE_PLAYER,
    audioId,
    audioType
});