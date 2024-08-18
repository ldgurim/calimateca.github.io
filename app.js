const video = document.getElementById('video');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const uploadForm = document.getElementById('uploadForm');
const videoFileInput = document.getElementById('videoFile');
let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const file = new File([blob], 'video.webm', { type: 'video/webm' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            videoFileInput.files = dataTransfer.files;
        };
    });

startButton.addEventListener('click', () => {
    recordedChunks = [];
    mediaRecorder.start();
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
});
