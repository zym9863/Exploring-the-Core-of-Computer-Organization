import React, { useState } from 'react';
import './ComputerSystemOverview.css';

interface ComponentDetail {
  name: string;
  description: string;
  functionality: string;
  connections: string;
  dataFlow: string;
}

const componentsData: Record<string, ComponentDetail> = {
  cpu: {
    name: '中央处理器 (CPU)',
    description: '计算机的控制中心和运算核心，负责执行指令和处理数据。',
    functionality: '执行算术运算、逻辑运算、数据传输、指令控制等。',
    connections: '通过总线与内存、输入/输出设备等连接。',
    dataFlow: '从内存读取指令和数据，处理后将结果写回内存或输出到设备。'
  },
  memory: {
    name: '内存 (Memory)',
    description: '用于暂时存放程序和数据的存储部件。',
    functionality: '存储正在运行的程序指令和需要处理的数据。',
    connections: '通过地址总线、数据总线、控制总线与CPU连接。',
    dataFlow: 'CPU通过地址总线指定读写位置，通过数据总线传输数据。'
  },
  inputDevice: {
    name: '输入设备 (Input Devices)',
    description: '向计算机输入数据和指令的设备。',
    functionality: '例如键盘、鼠标、扫描仪等，将外部信息转换为计算机可识别的信号。',
    connections: '通过接口电路与I/O控制器连接，再通过总线与CPU和内存通信。',
    dataFlow: '用户操作输入设备，产生信号，经转换后送入内存或CPU。'
  },
  outputDevice: {
    name: '输出设备 (Output Devices)',
    description: '将计算机处理结果展示给用户的设备。',
    functionality: '例如显示器、打印机、音箱等，将计算机内部数据转换为人类可识别的形式。',
    connections: '通过接口电路与I/O控制器连接，再通过总线与CPU和内存通信。',
    dataFlow: 'CPU将处理结果送至输出设备，转换为图像、声音等形式输出。'
  },
  storage: {
    name: '外存储器 (Storage Devices)',
    description: '用于长期存储大量数据的设备，如硬盘、固态硬盘。',
    functionality: '存储操作系统、应用程序和用户数据，断电后数据不丢失。',
    connections: '通过I/O控制器和总线与系统连接。',
    dataFlow: '数据在内存和外存之间进行交换，以实现长期保存和快速访问。'
  }
};

const ComputerSystemOverview: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentDetail | null>(null);

  const handleComponentClick = (componentKey: string) => {
    setSelectedComponent(componentsData[componentKey]);
  };

  const closeModal = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="overview-container">
      <h2>交互式计算机系统概览</h2>
      <div className="system-diagram">
        {Object.keys(componentsData).map((key) => (
          <div
            key={key}
            className={`component ${key}`}
            onClick={() => handleComponentClick(key)}
          >
            {componentsData[key].name.split(' ')[0]}
          </div>
        ))}

        {/* 主总线 */}
        <div className="bus-line main-bus">系统总线</div>

        {/* 连接线 */}
        <div className="connection-line" style={{
          width: '2px',
          height: '60px',
          top: '50%',
          left: '20%',
          transform: 'translateY(-120%)'
        }}></div>

        <div className="connection-line" style={{
          width: '2px',
          height: '60px',
          top: '50%',
          right: '20%',
          transform: 'translateY(-120%)'
        }}></div>

        <div className="connection-line" style={{
          width: '2px',
          height: '60px',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}></div>
      </div>

      {selectedComponent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedComponent.name}</h3>
            <p><strong>描述：</strong> {selectedComponent.description}</p>
            <p><strong>基本功能：</strong> {selectedComponent.functionality}</p>
            <p><strong>连接关系：</strong> {selectedComponent.connections}</p>
            <p><strong>数据流向：</strong> {selectedComponent.dataFlow}</p>
            <button onClick={closeModal}>关闭</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComputerSystemOverview;
