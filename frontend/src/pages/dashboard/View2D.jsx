import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Transformer, Line, Circle } from 'react-konva';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { FiArrowLeft, FiTrash2, FiSearch, FiMove, FiChevronLeft } from 'react-icons/fi';

const ROOM_CATEGORIES = [
  { id: 'living', name: 'Living Room', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&q=80' },
  { id: 'bedroom', name: 'Bedroom', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=80' },
  { id: 'dining', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1c0945592?w=300&q=80' },
  { id: 'office', name: 'Home Office', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=80' },
];

const FURNITURE_TYPES = [
  // Living Room
  { id: 'sofa', category: 'living', subCategory: 'Seating', type: 'sofa', name: 'Modern Sofa', defaultWidth: 180, defaultHeight: 80, color: '#475569' },
  { id: 'chair', category: 'living', subCategory: 'Seating', type: 'chair', name: 'Arm Chair', defaultWidth: 65, defaultHeight: 65, color: '#f59e0b' },
  { id: 'tv_unit', category: 'living', subCategory: 'Storage', type: 'tv_unit', name: 'TV Cabinet', defaultWidth: 140, defaultHeight: 40, color: '#1e293b' },
  { id: 'plant', category: 'living', subCategory: 'Decor', type: 'plant', name: 'Potted Plant', defaultWidth: 60, defaultHeight: 60, color: '#10b981' },
  
  // Bedroom
  { id: 'bed', category: 'bedroom', subCategory: 'Beds', type: 'bed', name: 'Double Bed', defaultWidth: 160, defaultHeight: 200, color: '#f8fafc' },
  { id: 'wardrobe', category: 'bedroom', subCategory: 'Storage', type: 'wardrobe', name: 'Wardrobe', defaultWidth: 120, defaultHeight: 60, color: '#cbd5e1' },
  { id: 'nightstand', category: 'bedroom', subCategory: 'Tables', type: 'nightstand', name: 'Nightstand', defaultWidth: 45, defaultHeight: 45, color: '#8b5cf6' },
  
  // Dining
  { id: 'dining_table', category: 'dining', subCategory: 'Tables', type: 'table', name: 'Dining Table', defaultWidth: 160, defaultHeight: 90, color: '#6d28d9' },
  
  // Office
  { id: 'desk', category: 'office', subCategory: 'Tables', type: 'desk', name: 'Office Desk', defaultWidth: 120, defaultHeight: 60, color: '#334155' },
];


// TOP-DOWN ARCHITECTURAL SYMBOLS

const TopDownRenderer = ({ type, width, height, color }) => {
  switch (type) {
    case 'bed':
      return (
        <Group>
          <Rect width={width} height={height} fill="#cbd5e1" cornerRadius={4} stroke="#94a3b8" strokeWidth={2} />
          <Rect x={4} y={30} width={width - 8} height={height - 34} fill={color} cornerRadius={4} shadowColor="rgba(0,0,0,0.1)" shadowBlur={4} shadowOffsetY={2} />
          <Rect x={width * 0.15} y={8} width={width * 0.3} height={20} fill="#ffffff" cornerRadius={3} stroke="#e2e8f0" strokeWidth={1} />
          <Rect x={width * 0.55} y={8} width={width * 0.3} height={20} fill="#ffffff" cornerRadius={3} stroke="#e2e8f0" strokeWidth={1} />
        </Group>
      );
    case 'sofa':
      return (
        <Group>
          <Rect width={width} height={height} fill={color} cornerRadius={5} stroke="#334155" strokeWidth={2} />
          <Rect x={0} y={0} width={width} height={height * 0.35} fill="rgba(0,0,0,0.2)" cornerRadius={[5, 5, 0, 0]} />
          <Rect x={0} y={height * 0.1} width={width * 0.15} height={height * 0.8} fill="rgba(0,0,0,0.15)" cornerRadius={3} />
          <Rect x={width * 0.85} y={height * 0.1} width={width * 0.15} height={height * 0.8} fill="rgba(0,0,0,0.15)" cornerRadius={3} />
          <Line points={[width/2, height*0.35, width/2, height]} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
        </Group>
      );
    case 'chair':
      return (
        <Group>
          <Rect width={width} height={height} fill={color} cornerRadius={8} stroke="#d97706" strokeWidth={2} />
          <Rect x={width*0.1} y={0} width={width*0.8} height={height*0.3} fill="rgba(0,0,0,0.15)" cornerRadius={4} />
          <Rect x={0} y={height*0.2} width={width*0.2} height={height*0.6} fill="rgba(0,0,0,0.1)" cornerRadius={3} />
          <Rect x={width*0.8} y={height*0.2} width={width*0.2} height={height*0.6} fill="rgba(0,0,0,0.1)" cornerRadius={3} />
        </Group>
      );
    case 'table':
      return (
        <Group>
          <Rect width={width} height={height} fill={color} cornerRadius={4} stroke="#4c1d95" strokeWidth={2} />
          <Line points={[width*0.1, height*0.2, width*0.9, height*0.2]} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
        </Group>
      );
    case 'tv_unit':
      return (
        <Group>
          <Rect width={width} height={height} fill={color} cornerRadius={2} stroke="#0f172a" strokeWidth={2} />
          <Rect x={width*0.1} y={height*0.2} width={width*0.8} height={height*0.6} fill="#000000" cornerRadius={1} />
        </Group>
      );
    case 'plant':
      return (
        <Group>
          <Circle x={width/2} y={height/2} radius={width/2} fill="#eab308" stroke="#ca8a04" strokeWidth={2} />
          <Circle x={width/2} y={height/2} radius={width*0.35} fill={color} />
          <Circle x={width/2 - 5} y={height/2 - 5} radius={width*0.15} fill="#34d399" />
          <Circle x={width/2 + 8} y={height/2 + 2} radius={width*0.12} fill="#059669" />
        </Group>
      );
    case 'wardrobe':
      return (
        <Group>
          <Rect width={width} height={height} fill={color} cornerRadius={2} stroke="#94a3b8" strokeWidth={2} />
          <Line points={[width/2, 0, width/2, height]} stroke="#94a3b8" strokeWidth={2} />
          <Line points={[width*0.45, height/2, width*0.45, height/2 + 10]} stroke="#475569" strokeWidth={3} />
          <Line points={[width*0.55, height/2, width*0.55, height/2 + 10]} stroke="#475569" strokeWidth={3} />
        </Group>
      );
    case 'nightstand':
      return (
        <Group>
          <Rect width={width} height={height} fill={color} cornerRadius={3} stroke="#6d28d9" strokeWidth={2} />
          <Circle x={width/2} y={height/2} radius={width*0.3} fill="#fef08a" stroke="#ca8a04" strokeWidth={1} />
        </Group>
      );
    case 'desk':
      return (
        <Group>
          <Rect width={width} height={height} fill={color} cornerRadius={3} stroke="#1e293b" strokeWidth={2} />
          <Rect x={width*0.1} y={height*0.1} width={width*0.3} height={height*0.8} fill="rgba(0,0,0,0.1)" />
        </Group>
      );
    default:
      return <Rect width={width} height={height} fill={color} cornerRadius={4} stroke="#000" strokeWidth={1} />;
  }
};


// INTERACTIVE FURNITURE COMPONENT

const FurnitureItem = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Group
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
          });
        }}
      >
        <TopDownRenderer type={shapeProps.type} width={shapeProps.width} height={shapeProps.height} color={shapeProps.fill} />
      </Group>
      
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 30 || newBox.height < 30) return oldBox;
            return newBox;
          }}
          borderStroke="#2563eb"
          anchorStroke="#2563eb"
          anchorFill="#ffffff"
          anchorSize={8}
          padding={5}
        />
      )}
    </React.Fragment>
  );
};


//  MAIN 2D VIEW COMPONENT

function View2D() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const roomSpecs = location.state?.roomSpecs || { width: 5, length: 5, colorScheme: '#f8fafc' };
  const designId = location.state?.designId;

  const [furniture, setFurniture] = useState(location.state?.furniture || []);
  const [selectedId, selectShape] = useState(null);
  const [activeRoom, setActiveRoom] = useState(null); 
  const [activeSubCategory, setActiveSubCategory] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleRoomSelect = (roomId) => {
    setActiveRoom(roomId);
    setActiveSubCategory('All'); 
  };

  const roomWidthPx = roomSpecs.width * 100;
  const roomLengthPx = roomSpecs.length * 100;
  const canvasWidth = Math.max(800, roomWidthPx + 200);
  const canvasHeight = Math.max(600, roomLengthPx + 200);
  const startX = (canvasWidth - roomWidthPx) / 2;
  const startY = (canvasHeight - roomLengthPx) / 2;

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) selectShape(null);
  };

  const addFurniture = (typeConfig) => {
    const newItem = {
      id: `${typeConfig.id}_${Date.now()}`,
      type: typeConfig.type,
      x: startX + roomWidthPx / 2 - typeConfig.defaultWidth / 2,
      y: startY + roomLengthPx / 2 - typeConfig.defaultHeight / 2,
      width: typeConfig.defaultWidth,
      height: typeConfig.defaultHeight,
      fill: typeConfig.color,
      rotation: 0,
    };
    setFurniture([...furniture, newItem]);
    selectShape(newItem.id);
  };

  const handleDeleteSelected = () => {
    if (selectedId) {
      setFurniture((prev) => prev.filter(item => item.id !== selectedId));
      selectShape(null);
    }
  };

  // Keyboard 'Delete' or 'Backspace' key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        handleDeleteSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const handleProceedTo3D = async () => {
    if (!designId) {
      navigate('/view-3d', { state: { furniture, roomSpecs } });
      return;
    }

    setIsSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/designs/update/${designId}`, { furniture: furniture });
      navigate('/view-3d', { state: { furniture, roomSpecs, designId } });
    } catch (error) {
      console.error("Error auto-saving 2D layout:", error);
      alert("Warning: Could not save 2D layout progress, but proceeding to 3D.");
      navigate('/view-3d', { state: { furniture, roomSpecs, designId } });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredFurniture = FURNITURE_TYPES.filter(item => {
    const matchesRoom = activeRoom ? item.category === activeRoom : true;
    const matchesSub = activeSubCategory === 'All' ? true : item.subCategory === activeSubCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRoom && matchesSub && matchesSearch;
  });

  const roomItems = activeRoom ? FURNITURE_TYPES.filter(item => item.category === activeRoom) : [];
  const availableSubCategories = ['All', ...new Set(roomItems.map(item => item.subCategory))];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
        
        {/* Top Actions */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <button onClick={() => navigate('/designer-dashboard')} className="text-slate-400 hover:text-slate-800 transition-colors">
            <FiArrowLeft size={22} />
          </button>
          <div className="flex bg-slate-100 rounded-full p-1">
            <span className="bg-white text-slate-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm">2D</span>
            <button onClick={handleProceedTo3D} disabled={isSaving} className="text-slate-500 hover:text-slate-800 font-bold text-sm px-4 py-1 rounded-full transition-colors disabled:opacity-50">
              {isSaving ? '...' : '3D'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#eab308]"
            />
          </div>
        </div>

        {/* Dynamic Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          
          {/* View 1: Show Rooms */}
          {!activeRoom ? (
            <div>
              <div className="flex space-x-6 border-b border-slate-200 mb-4 px-2">
                <button className="text-[#0a152d] font-bold border-b-2 border-[#eab308] pb-2 text-sm">Rooms</button>
                <button className="text-slate-400 hover:text-slate-600 font-bold pb-2 text-sm transition-colors">Categories</button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {ROOM_CATEGORIES.map((room) => (
                  <div 
                    key={room.id}
                    onClick={() => handleRoomSelect(room.id)}
                    className="cursor-pointer group rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all hover:border-[#eab308]"
                  >
                    <div className="h-24 overflow-hidden">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-2 bg-white text-center">
                      <p className="text-xs font-bold text-[#0a152d]">{room.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            
          /* View 2: Show Furniture in Selected Room */
            <div className="flex flex-col h-full">
              <button 
                onClick={() => setActiveRoom(null)}
                className="flex items-center text-sm font-bold text-slate-500 hover:text-[#0a152d] mb-4 transition-colors"
              >
                <FiChevronLeft className="mr-1" size={18} /> Back to Rooms
              </button>
              
              <h3 className="text-sm font-bold text-[#0a152d] mb-3">
                {ROOM_CATEGORIES.find(c => c.id === activeRoom)?.name} Items
              </h3>

              <div className="flex overflow-x-auto space-x-2 mb-4 pb-2 [&::-webkit-scrollbar]:hidden">
                {availableSubCategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubCategory(sub)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                      activeSubCategory === sub
                        ? 'bg-[#0a152d] text-[#eab308]'
                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pb-4">
                {filteredFurniture.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => addFurniture(item)} 
                    className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 hover:border-[#eab308] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-lg mb-2 flex items-center justify-center border border-slate-100">
                      <div style={{ width: '28px', height: '28px', backgroundColor: item.color, borderRadius: item.type === 'plant' ? '50%' : '4px' }}></div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 text-center">{item.name}</span>
                  </button>
                ))}
                
                {filteredFurniture.length === 0 && (
                  <div className="col-span-2 text-center py-6 text-slate-400 text-sm">
                    No items found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ALWAYS VISIBLE DELETE BUTTON AT THE BOTTOM */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button 
            onClick={handleDeleteSelected}
            disabled={!selectedId}
            className={`w-full flex items-center justify-center py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              selectedId 
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:shadow-md' 
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <FiTrash2 className="mr-2" size={18} /> {selectedId ? 'Delete Selected Item' : 'Select an item to delete'}
          </button>
        </div>
      </div>

      {/* Blueprint Canvas Area (Grid) */}
      <div 
        className="flex-1 overflow-auto relative"
        style={{
          backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundColor: '#f8fafc'
        }}
      >
        <div className="min-w-max min-h-max p-10 flex items-center justify-center">
          <Stage 
            width={canvasWidth} 
            height={canvasHeight} 
            onMouseDown={checkDeselect} 
            onTouchStart={checkDeselect}
          >
            <Layer>
              <Rect 
                x={startX} y={startY} 
                width={roomWidthPx} height={roomLengthPx} 
                fill={roomSpecs.colorScheme} 
                stroke="#64748b" 
                strokeWidth={1}
                shadowColor="rgba(0,0,0,0.05)"
                shadowBlur={10}
              />
              <Rect 
                x={startX - 10} y={startY - 10} 
                width={roomWidthPx + 20} height={roomLengthPx + 20} 
                stroke="#1e293b" 
                strokeWidth={10} 
              />
              <Line points={[startX, startY - 30, startX + roomWidthPx, startY - 30]} stroke="#64748b" strokeWidth={1} />
              <Line points={[startX, startY - 35, startX, startY - 25]} stroke="#64748b" strokeWidth={2} />
              <Line points={[startX + roomWidthPx, startY - 35, startX + roomWidthPx, startY - 25]} stroke="#64748b" strokeWidth={2} />
              <Rect x={startX + roomWidthPx/2 - 30} y={startY - 40} width={60} height={20} fill="#f8fafc" />
              <Text x={startX + roomWidthPx/2 - 25} y={startY - 35} text={`${roomSpecs.width} m`} fontSize={14} fill="#475569" fontStyle="bold" />
              <Line points={[startX - 30, startY, startX - 30, startY + roomLengthPx]} stroke="#64748b" strokeWidth={1} />
              <Line points={[startX - 35, startY, startX - 25, startY]} stroke="#64748b" strokeWidth={2} />
              <Line points={[startX - 35, startY + roomLengthPx, startX - 25, startY + roomLengthPx]} stroke="#64748b" strokeWidth={2} />
              <Rect x={startX - 50} y={startY + roomLengthPx/2 - 10} width={40} height={20} fill="#f8fafc" />
              <Text x={startX - 45} y={startY + roomLengthPx/2 - 6} text={`${roomSpecs.length} m`} fontSize={14} fill="#475569" fontStyle="bold" rotation={-90} />

              {furniture.map((item, i) => (
                <FurnitureItem
                  key={item.id}
                  shapeProps={item}
                  isSelected={item.id === selectedId}
                  onSelect={() => selectShape(item.id)}
                  onChange={(newAttrs) => {
                    const rects = furniture.slice();
                    rects[i] = newAttrs;
                    setFurniture(rects);
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md text-slate-800 px-6 py-2.5 rounded-full shadow-lg border border-slate-200 flex items-center text-xs font-bold">
          <FiMove className="mr-3 text-[#eab308]" size={16} />
          Drag elements to position, click to resize/rotate, press Delete to remove.
        </div>
      </div>
    </div>
  );
}

export default View2D;