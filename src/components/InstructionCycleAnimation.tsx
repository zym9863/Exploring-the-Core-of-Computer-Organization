import React, { useState, useEffect, useCallback } from 'react';
import './InstructionCycleAnimation.css';

interface Step {
  name: string;
  activeComponents: string[];
  dataFlow?: { from: string; to: string; data: string }[];
  description: string;
}

const instructionSteps: Step[] = [
  {
    name: '取指 (Fetch)',
    activeComponents: ['pc', 'mar', 'memory', 'mdr', 'ir'],
    dataFlow: [
      { from: 'pc', to: 'mar', data: 'PC内容(指令地址)' },
      { from: 'memory', to: 'mdr', data: '指令字' },
      { from: 'mdr', to: 'ir', data: '指令字' },
    ],
    description: 'CPU从内存中读取指令。程序计数器(PC)中的地址发送到内存地址寄存器(MAR)，内存根据MAR中的地址找到指令，通过数据总线发送到内存数据寄存器(MDR)，最后加载到指令寄存器(IR)。PC自动递增指向下一条指令。'
  },
  {
    name: '译码 (Decode)',
    activeComponents: ['ir', 'cu'],
    description: '控制单元(CU)解析指令寄存器(IR)中的指令，确定操作类型和操作数。'
  },
  {
    name: '执行 (Execute)',
    activeComponents: ['alu', 'registers', 'cu'], // 'registers' can be more specific if needed
    dataFlow: [
        // Example: ADD R1, R2 -> R1 = R1 + R2
        // This part is highly dependent on the specific instruction being demonstrated
        { from: 'registers', to: 'alu', data: '操作数1' },
        { from: 'registers', to: 'alu', data: '操作数2' },
        { from: 'alu', to: 'registers', data: '运算结果' },
    ],
    description: '根据译码结果，算术逻辑单元(ALU)执行指定的操作，例如算术运算或逻辑运算。可能涉及从通用寄存器读取数据，并将结果写回寄存器。'
  },
  {
    name: '访存 (Memory Access)',
    activeComponents: ['mar', 'mdr', 'memory', 'registers'],
     dataFlow: [
        // Example: LOAD R1, [address] or STORE R1, [address]
        { from: 'registers', to: 'mar', data: '数据地址' }, // For LOAD/STORE
        { from: 'memory', to: 'mdr', data: '数据 (LOAD)' },
        { from: 'mdr', to: 'registers', data: '数据 (LOAD)' },
        // or
        { from: 'registers', to: 'mdr', data: '数据 (STORE)' },
        { from: 'mdr', to: 'memory', data: '数据 (STORE)' },
    ],
    description: '如果指令需要访问内存（如LOAD或STORE操作），则在此时进行。CPU将数据地址发送到MAR，然后从MDR读取数据或将数据写入MDR，再通过总线与内存交互。'
  },
  {
    name: '写回 (Write Back)',
    activeComponents: ['registers', 'alu'], // Or memory if result goes to memory
     dataFlow: [
        { from: 'alu', to: 'registers', data: '最终结果' }, // If not already done in Execute
    ],
    description: '将执行结果写回到通用寄存器或内存。对于某些指令，此步骤可能与执行步骤合并。'
  },
];

const componentPositions: Record<string, { top: string; left: string; label: string }> = {
  pc: { top: '10%', left: '10%', label: 'PC (程序计数器)' },
  mar: { top: '10%', left: '30%', label: 'MAR (内存地址寄存器)' },
  mdr: { top: '10%', left: '50%', label: 'MDR (内存数据寄存器)' },
  ir: { top: '10%', left: '70%', label: 'IR (指令寄存器)' },
  cu: { top: '30%', left: '10%', label: 'CU (控制单元)' },
  alu: { top: '30%', left: '40%', label: 'ALU (算术逻辑单元)' },
  registers: { top: '30%', left: '70%', label: '通用寄存器' },
  memory: { top: '60%', left: '40%', label: '内存 (Memory)' },
  // Buses can be represented by lines, data flow animated on them
};


const InstructionCycleAnimation: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = instructionSteps[currentStepIndex];

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prevIndex) => (prevIndex + 1) % instructionSteps.length);
  }, []);

  const prevStep = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex - 1 + instructionSteps.length) % instructionSteps.length);
  };

  const resetAnimation = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        nextStep();
      }, 2000); // Adjust speed as needed
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, nextStep]);

  return (
    <div className="instruction-cycle-container">
      <h2>简化指令周期动态演示</h2>

      <div className="controls">
        <button onClick={togglePlay}>
          {isPlaying ? '暂停' : '播放'}
        </button>
        <button onClick={prevStep} disabled={isPlaying}>
          上一步
        </button>
        <button onClick={nextStep} disabled={isPlaying}>
          下一步
        </button>
        <button onClick={resetAnimation}>
          重置
        </button>
      </div>

      {/* 步骤指示器 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        margin: '15px 0'
      }}>
        {instructionSteps.map((step, index) => (
          <div
            key={index}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentStepIndex
                ? 'var(--secondary-color)'
                : 'var(--bg-tertiary)',
              transition: 'all var(--transition-speed) ease',
              cursor: 'pointer',
              transform: index === currentStepIndex ? 'scale(1.3)' : 'scale(1)'
            }}
            onClick={() => !isPlaying && setCurrentStepIndex(index)}
            title={step.name}
          />
        ))}
      </div>

      <div className="animation-area">
        {/* 组件盒子 */}
        {Object.entries(componentPositions).map(([key, { top, left, label }]) => (
          <div
            key={key}
            className={`component-box ${key} ${currentStep.activeComponents.includes(key) ? 'active' : ''}`}
            style={{ top, left }}
          >
            {label}
          </div>
        ))}

        {/* 数据流指示器 - 简化版本 */}
        {currentStep.dataFlow?.map((flow, index) => {
          // 查找源组件和目标组件的位置
          const fromComponent = componentPositions[flow.from];
          const toComponent = componentPositions[flow.to];

          // 如果找到了组件位置，创建一个简单的指示器
          if (fromComponent && toComponent) {
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: `calc(${fromComponent.top} + 30px)`,
                  left: `calc(${fromComponent.left} + 60px)`,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-color)',
                  zIndex: 5,
                  animation: 'pulse 1s infinite',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                title={`${flow.from} → ${flow.to}: ${flow.data}`}
              >
                →
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="step-info">
        <h3>当前步骤: {currentStep.name}</h3>
        <p>{currentStep.description}</p>

        {/* 添加步骤进度指示器 */}
        <div style={{
          marginTop: '15px',
          height: '6px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${((currentStepIndex + 1) / instructionSteps.length) * 100}%`,
            backgroundColor: 'var(--primary-color)',
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export default InstructionCycleAnimation;
