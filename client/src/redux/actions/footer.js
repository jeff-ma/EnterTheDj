export const UPDATE_AUDIO = 'UPDATE_AUDIO';

export const updateAudio = (audioId, audioType) => ({
    type: UPDATE_AUDIO,
    audioId,
    audioType
});

