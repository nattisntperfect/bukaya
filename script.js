import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// --- 1. SETUP DASAR (Sama seperti sebelumnya) ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffc0cb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3d').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 3, 0);

// --- 2. PENCAHAYAAN (Sama seperti sebelumnya) ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// --- 3. MEMBUAT OBJEK-OBJEK ---

// Tanah
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x8fbc8f }); // Warna hijau
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Grup untuk menampung teks
const mainElements = new THREE.Group();
scene.add(mainElements);

// Teks 3D
const fontLoader = new FontLoader();
fontLoader.load('https://unpkg.com/three@0.165.0/examples/fonts/helvetiker_bold.typeface.json', (font) => {
    const textGeometry = new TextGeometry('HBD ya Saudara Perempuan\n(Jihan Azka)', {
        font: font, size: 1.5, height: 0.4, curveSegments: 12,
        bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.05, bevelSegments: 5
    });
    textGeometry.center();
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.y = 4;
    mainElements.add(textMesh);
});

// === BAGIAN YANG DIUBAH 1: FUNGSI MONITOR ===
// --- FUNGSI UNTUK MEMBUAT MONITOR FOTO (TANPA PENYANGGA) ---
function createPhotoMonitor() {
    const monitorGroup = new THREE.Group();
    const textureLoader = new THREE.TextureLoader();

    // Layar dengan foto
    const screenGeometry = new THREE.PlaneGeometry(8, 4.5); // Rasio 16:9
    const screenMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('hhhh.jpeg'),
        side: THREE.DoubleSide,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    monitorGroup.add(screen);

    // Bingkai Monitor
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const frameGeometry = new THREE.BoxGeometry(8.2, 4.7, 0.3);
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.z = -0.16;
    monitorGroup.add(frame);
    
    // Tiang dan Kaki Penyangga DIHAPUS

    return monitorGroup;
}

// Panggil fungsi untuk membuat monitor
const photoMonitor = createPhotoMonitor();
// Posisikan monitor di atas teks
photoMonitor.position.set(0, 9, 0); 
scene.add(photoMonitor);


// Karakter Roblox
function createRobloxCharacter() {
    const character = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({ color: '#ffdbac' });
    const shirt = new THREE.MeshStandardMaterial({ color: '#ff8fab' });
    const pants = new THREE.MeshStandardMaterial({ color: '#3b82f6' });
    const hair = new THREE.MeshStandardMaterial({ color: '#4a2c0f' });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 1), shirt);
    torso.position.y = 1;
    character.add(torso);
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), skin);
    head.position.y = 2.75;
    character.add(head);
    const mainHair = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 1.6), hair);
    mainHair.position.y = 3.5;
    character.add(mainHair);
    const backHair = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 0.5), hair);
    backHair.position.set(0, 2.75, -0.5);
    character.add(backHair);
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2, 0.8), skin);
    leftArm.position.set(-1.4, 1, 0);
    character.add(leftArm);
    const rightArm = leftArm.clone();
    rightArm.position.x = 1.4;
    rightArm.rotation.z = -0.3;
    character.add(rightArm);
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), pants);
    leftLeg.position.set(-0.5, -1, 0);
    character.add(leftLeg);
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.5;
    character.add(rightLeg);
    return character;
}

const girlCharacter = createRobloxCharacter();
girlCharacter.position.set(8, 1, -2);
girlCharacter.rotation.y = -0.8;
scene.add(girlCharacter);

// Confetti
const confettiPieces = [];
const confettiColors = [0xffffff, 0xFDFD96, 0xC8A2C8, 0xff8fab];
for (let i = 0; i < 200; i++) {
    const confettiGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const confettiMaterial = new THREE.MeshStandardMaterial({ color: confettiColors[Math.floor(Math.random() * confettiColors.length)] });
    const confetti = new THREE.Mesh(confettiGeometry, confettiMaterial);
    confetti.position.set((Math.random() - 0.5) * 40, Math.random() * 20, (Math.random() - 0.5) * 40);
    confetti.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(confetti);
    confettiPieces.push(confetti);
}

// --- 4. ANIMASI ---
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Animasi grup teks
    mainElements.position.y = Math.sin(elapsedTime * 0.5) * 0.3;
    
    // Animasi karakter
    girlCharacter.position.y = 1 + Math.sin(elapsedTime * 2) * 0.15;

    // === BAGIAN YANG DIUBAH 2: ANIMASI MONITOR ===
    // Animasi monitor melayang
    photoMonitor.position.y = 9 + Math.sin(elapsedTime * 0.7) * 0.2;
    photoMonitor.rotation.y = Math.sin(elapsedTime * 0.3) * 0.1;


    // Animasi confetti
    confettiPieces.forEach(piece => {
        piece.rotation.x += 0.01;
        piece.rotation.y += 0.02;
    });

    controls.update();
    renderer.render(scene, camera);
}
animate();

// --- 5. RESPONSIVE ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
