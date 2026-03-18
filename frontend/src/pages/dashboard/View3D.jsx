import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiCheckCircle, FiInfo } from 'react-icons/fi';


// 1. 3D FURNITURE MODELS (Upgraded Materials)


const SofaModel = ({ width, depth, color }) => (
  <group>
    <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.4, depth]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
    <mesh position={[0, 0.6, -depth/2 + 0.1]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.6, 0.2]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
    <mesh position={[-width/2 + 0.1, 0.45, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.2, 0.5, depth]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
    <mesh position={[width/2 - 0.1, 0.45, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.2, 0.5, depth]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  </group>
);

const BedModel = ({ width, depth, color }) => (
  <group>
    <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.3, depth]} />
      <meshStandardMaterial color="#3e2723" roughness={0.8} /> 
    </mesh>
    <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
      <boxGeometry args={[width - 0.1, 0.2, depth - 0.1]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
    <mesh position={[0, 0.6, -depth/2 + 0.05]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.8, 0.1]} />
      <meshStandardMaterial color="#1f140f" roughness={0.8} />
    </mesh>
    <mesh position={[-width/4, 0.48, -depth/2 + 0.3]} castShadow receiveShadow>
      <boxGeometry args={[width/3, 0.1, 0.25]} />
      <meshStandardMaterial color="#ffffff" roughness={0.9} />
    </mesh>
    <mesh position={[width/4, 0.48, -depth/2 + 0.3]} castShadow receiveShadow>
      <boxGeometry args={[width/3, 0.1, 0.25]} />
      <meshStandardMaterial color="#ffffff" roughness={0.9} />
    </mesh>
  </group>
);

const TableModel = ({ width, depth, color }) => (
  <group>
    <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.05, depth]} />
      <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.2} clearcoat={0.6} />
    </mesh>
    {[-width/2 + 0.1, width/2 - 0.1].map((x, i) => 
      [-depth/2 + 0.1, depth/2 - 0.1].map((z, j) => (
        <mesh key={`${i}-${j}`} position={[x, 0.4, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.02, 0.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
      ))
    )}
  </group>
);

const ChairModel = ({ width, depth, color }) => (
  <group>
    <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.05, depth]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
    <mesh position={[0, 0.75, -depth/2 + 0.025]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.6, 0.05]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
    {[-width/2 + 0.05, width/2 - 0.05].map((x, i) => 
      [-depth/2 + 0.05, depth/2 - 0.05].map((z, j) => (
        <mesh key={`chair-${i}-${j}`} position={[x, 0.225, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.015, 0.45]} />
          <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.7} />
        </mesh>
      ))
    )}
  </group>
);

const TVUnitModel = ({ width, depth, color }) => (
  <group>
    <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.4, depth]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
    <mesh position={[0, 0.9, -depth/2 + 0.05]} castShadow receiveShadow>
      <boxGeometry args={[width * 0.8, 0.8, 0.05]} />
      <meshPhysicalMaterial color="#000000" roughness={0.0} metalness={0.8} clearcoat={1} />
    </mesh>
  </group>
);

const PlantModel = ({ width, depth, color }) => (
  <group>
    <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[width/3, width/4, 0.4]} />
      <meshStandardMaterial color="#b58d3d" roughness={0.4} metalness={0.2} /> 
    </mesh>
    <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
      <sphereGeometry args={[width/1.8, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  </group>
);

const GenericBoxModel = ({ width, height, depth, color }) => (
  <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
    <boxGeometry args={[width, height, depth]} />
    <meshStandardMaterial color={color} roughness={0.5} />
  </mesh>
);



// 2. ARCHITECTURAL ROOM STRUCTURE (Highly Detailed)

const RoomStructure = ({ width, length, floorColor }) => {
  const wallThickness = 0.2;
  const wallHeight = 3.0; 
  const wallColor = "#fcfcfc"; 
  const skirtingColor = "#e2e8f0";

  return (
    <group>
      {/* 1. Floor (Polished) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshPhysicalMaterial color={floorColor} roughness={0.2} metalness={0.1} clearcoat={0.3} />
      </mesh>

      {/* Skirting Boards (Baseboards) - Adds immense realism */}
      <mesh position={[0, 0.05, -length / 2 + 0.02]} receiveShadow>
        <boxGeometry args={[width, 0.1, 0.04]} />
        <meshStandardMaterial color={skirtingColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, length / 2 - 0.02]} receiveShadow>
        <boxGeometry args={[width, 0.1, 0.04]} />
        <meshStandardMaterial color={skirtingColor} roughness={0.5} />
      </mesh>
      <mesh position={[-width / 2 + 0.02, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.04, 0.1, length]} />
        <meshStandardMaterial color={skirtingColor} roughness={0.5} />
      </mesh>
      <mesh position={[width / 2 - 0.02, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.04, 0.1, length]} />
        <meshStandardMaterial color={skirtingColor} roughness={0.5} />
      </mesh>

      {/* 2. North Wall */}
      <mesh position={[0, wallHeight / 2, -length / 2 - wallThickness / 2]} castShadow receiveShadow>
        <boxGeometry args={[width + wallThickness * 2, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      
      {/* 3. South Wall */}
      <mesh position={[0, wallHeight / 2, length / 2 + wallThickness / 2]} castShadow receiveShadow>
        <boxGeometry args={[width + wallThickness * 2, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      
      {/* 4. West Wall (DOOR) */}
      <group position={[-width / 2 - wallThickness / 2, 0, 0]}>
        <mesh position={[0, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, length]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        <group position={[wallThickness/2 + 0.01, 1, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
             <boxGeometry args={[0.06, 2.1, 1.1]} />
             <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
          </mesh>
          <mesh position={[0.03, 0, 0]} castShadow>
             <boxGeometry args={[0.02, 2, 1]} />
             <meshStandardMaterial color="#6b4423" roughness={0.7} />
          </mesh>
          <mesh position={[0.06, 0, 0.4]} castShadow>
             <sphereGeometry args={[0.03]} />
             <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
      
      {/* 5. East Wall (WINDOW) */}
      <group position={[width / 2 + wallThickness / 2, 0, 0]}>
        <mesh position={[0, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, length]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
        <group position={[-wallThickness/2 - 0.01, 1.5, 0]}>
          {/* Frame */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 1.6, 2.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          {/* Glass */}
          <mesh position={[-0.01, 0, 0]}>
            <boxGeometry args={[0.02, 1.5, 2]} />
            <meshPhysicalMaterial color="#e0f2fe" transmission={0.95} opacity={1} transparent roughness={0.0} metalness={0.2} ior={1.5} />
          </mesh>
          {/* Crossbars */}
          <mesh position={[-0.02, 0, 0]} castShadow>
            <boxGeometry args={[0.03, 1.5, 0.05]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          <mesh position={[-0.02, 0, 0]} castShadow>
            <boxGeometry args={[0.03, 0.05, 2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
};


// 3. MAIN 3D VIEW COMPONENT


function View3D() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const furniture = location.state?.furniture || [];
  const roomSpecs = location.state?.roomSpecs || { width: 5, length: 5, colorScheme: '#e2e8f0' };
  const designId = location.state?.designId;

  const [isSaving, setIsSaving] = useState(false);
  const scaleFactor = 100;

  const get3DCoordinates = (itemX, itemY, itemWidth, itemHeight) => {
    const roomWidthPx = roomSpecs.width * scaleFactor;
    const roomLengthPx = roomSpecs.length * scaleFactor;
    
    const canvasWidth = Math.max(800, roomWidthPx + 200);
    const canvasHeight = Math.max(600, roomLengthPx + 200);
    const startX = (canvasWidth - roomWidthPx) / 2;
    const startY = (canvasHeight - roomLengthPx) / 2;

    const relativeX = (itemX + itemWidth / 2) - (startX + roomWidthPx / 2);
    const relativeZ = (itemY + itemHeight / 2) - (startY + roomLengthPx / 2);

    return {
      x: relativeX / scaleFactor,
      z: relativeZ / scaleFactor
    };
  };

  const handleFinalize = async () => {
    if (!designId) {
      alert("Design ID is missing! Proceeding without saving.");
      navigate('/designer-dashboard');
      return;
    }

    setIsSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/designs/update/${designId}`, {
        furniture: furniture
      });
      alert("🎉 3D Design Finalized and Saved Successfully!");
      navigate('/designer-dashboard'); 
    } catch (error) {
      console.error("Error finalizing design:", error);
      alert("Something went wrong while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0a152d] relative font-sans overflow-hidden">
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 z-10 pointer-events-none flex justify-between items-start">
        <div className="space-y-4 pointer-events-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold transition-all shadow-xl text-sm"
          >
            <FiArrowLeft className="mr-2 text-[#eab308]" /> Back to 2D
          </button>
        </div>

        <div className="pointer-events-auto">
          <button 
            onClick={handleFinalize} 
            disabled={isSaving}
            className={`flex items-center px-6 py-3 rounded-xl font-bold text-[#0a152d] shadow-2xl transition-all duration-300 text-sm ${
              isSaving 
                ? 'bg-yellow-600/50 cursor-not-allowed border border-yellow-400/30 text-white' 
                : 'bg-[#eab308] hover:bg-yellow-400 border border-yellow-300 hover:scale-105'
            }`}
          >
            {isSaving ? "Saving..." : <><FiCheckCircle className="mr-2" size={18} /> Finalize Project</>}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none hidden md:block">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3.5 rounded-full text-slate-200 text-xs font-medium flex items-center shadow-2xl">
          <FiInfo className="mr-3 text-[#eab308]" size={18} />
          <span className="mr-6"><strong>Left Click + Drag:</strong> Rotate</span>
          <span className="mr-6"><strong>Right Click + Drag:</strong> Pan</span>
          <span><strong>Scroll:</strong> Zoom</span>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <Canvas camera={{ position: [0, 8, 8], fov: 50 }} shadows>
        
        
        <gridHelper args={[100, 100, '#ffffff', '#ffffff']} position={[0, -0.01, 0]} opacity={0.1} transparent />

        {/* Sunlight Simulation  */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[12, 8, 0]} // Light coming from the East (Window side)
          intensity={1.8} 
          castShadow 
          shadow-mapSize={2048}
          shadow-bias={-0.0001}
        />
        <pointLight position={[0, 4, 0]} intensity={0.4} color="#fef08a" />
        
        {/* Environment map adds realistic reflections to shiny surfaces */}
        <Environment preset="city" background={false} /> 

        {/* Controls */}
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} minDistance={3} maxDistance={25} /> 

        {/* Room Container */}
        <RoomStructure width={roomSpecs.width} length={roomSpecs.length} floorColor={roomSpecs.colorScheme} />

        {/* Render Furniture Items */}
        {furniture.map((item, index) => {
          const width3D = item.width / scaleFactor;
          const depth3D = item.height / scaleFactor;
          
          const coords = get3DCoordinates(item.x, item.y, item.width, item.height);
          const rotationY = -(item.rotation || 0) * (Math.PI / 180);

          return (
            <group key={item.id || index} position={[coords.x, 0, coords.z]} rotation={[0, rotationY, 0]}>
              {item.type === 'sofa' && <SofaModel width={width3D} depth={depth3D} color={item.fill} />}
              {item.type === 'bed' && <BedModel width={width3D} depth={depth3D} color={item.fill} />}
              {item.type === 'table' && <TableModel width={width3D} depth={depth3D} color={item.fill} />}
              {item.type === 'chair' && <ChairModel width={width3D} depth={depth3D} color={item.fill} />}
              {item.type === 'tv_unit' && <TVUnitModel width={width3D} depth={depth3D} color={item.fill} />}
              {item.type === 'plant' && <PlantModel width={width3D} depth={depth3D} color={item.fill} />}
              {item.type === 'wardrobe' && <GenericBoxModel width={width3D} height={2} depth={depth3D} color={item.fill} />}
              {item.type === 'nightstand' && <GenericBoxModel width={width3D} height={0.5} depth={depth3D} color={item.fill} />}
              {item.type === 'desk' && <TableModel width={width3D} depth={depth3D} color={item.fill} />}
              {(!item.type || item.type === 'box') && (
                 <GenericBoxModel width={width3D} height={1} depth={depth3D} color={item.fill} />
              )}
            </group>
          );
        })}

        {/* Ambient occlusion shadow layer  */}
        <ContactShadows position={[0, 0.01, 0]} opacity={0.7} scale={20} blur={1.5} far={2} color="#000000" />
        
      </Canvas>
    </div>
  );
}

export default View3D;