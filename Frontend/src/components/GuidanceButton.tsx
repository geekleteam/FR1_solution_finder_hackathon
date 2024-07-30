import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';


const steps:any = [
  {
    target: '.playground',
    title: 'Diagram Playground',
    content: 'Your canvas for creating awesome diagrams!',
    disableBeacon: true,
    placement: 'center'
  },
  {
    target: '.payground-controls',
    title: 'Zoom Controls',
    content: 'Zoom in or out to focus on details or see the big picture.',
    disableBeacon: true,
    placement: 'bottom'
  },
  {
    target: '.control-theme',
    title: 'Theme Picker',
    content: 'Change the look! Pick a theme that suits your style.',
    disableBeacon: true,
    placement: 'right'
  },
  {
    target: '.right-side-panel-collapse-button',
    title: 'Expand/Collapse',
    content: 'Need more space? Toggle this to resize your workspace.',
    disableBeacon: true,
    disableOverlayClose: true,
    placement: 'left'
  },
  {
    target: '.generate-diagram-with-chat',
    title: 'AI Assistant',
    content: 'Describe your diagram, and let AI do the magic!',
    disableBeacon: true,
    placement: 'bottom'
  },
  {
    target: '.click-to-open-toolbar',
    title: 'Toolbox',
    content: 'Click here for all your diagramming tools.',
    disableBeacon: true,
    disableOverlayClose: true,
    placement: 'right'
  },
  {
    target: '.drag-and-drop-blocks',
    title: 'Building Blocks',
    content: "Drag and drop these to build your diagram. Easy!",
    disableBeacon: true,
    placement: 'left'
  },
  {
    target: '.download-diagram',
    title: 'Export',
    content: 'Download your diagram to share or present.',
    disableBeacon: true,
    placement: 'bottom'
  },
  {
    target: '.upload-diagram',
    title: 'Import',
    content: 'Bring in your saved diagrams to keep working.',
    disableBeacon: true,
    placement: 'right'
  }, 
  {
    target: '.right-side-panel-collapse-button',
    title: 'Collapse',
    content: 'Close this panel...',
    disableBeacon: true,
    disableOverlayClose: true,
    placement: 'left'
  },
  {
    target: '.clean-canvas',
    title: 'Clean Your Diagram',
    content: "This button allows you to clear all elements from your diagram. Use it when you want to start fresh or remove all current content. Remember, this action can't be undone, so use it carefully!",
    disableBeacon: true,
  },
  {
    target: '.create-new-diagram',
    title: 'Create New Diagram',
    content: 'Click on this to open new Diagram canvas',
    disableBeacon: true,
    placement: 'right'
  },
  {
    target: '.playground',
    title: 'Ready, Set, Go!',
    content: "You're all set. Start creating amazing diagrams!",
    disableBeacon: true,
    placement: 'center'
  }
];




const GuideButton = () => {

    const [runGuide,setRunGuide] = useState(false)
    const handleJoyrideCallback = (data: CallBackProps) => {
      const { status } = data; //@ts-ignore
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        setRunGuide(false);
      }
    };


  return (<>
    <Guide onClick={()=>setRunGuide(true)}  />
    <Joyride 
        callback={handleJoyrideCallback} 
        continuous={true} 
        run={runGuide} 
        steps={steps}
        showProgress
        showSkipButton
        spotlightClicks
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#10B981', // Green color
            textColor: '#333',
          },
          buttonNext: {
            backgroundColor: '#10B981', // Green color
          },
          buttonBack: {
            color: '#EC4899', // Pink color
            marginRight: 10,
          },
        }}

        
        
        
        />
    </>
  )
}

export default GuideButton



interface GuideButtonProps {
    onClick: () => void;
    label?: string;
  }
  
  
   const Guide: React.FC<GuideButtonProps> = ({ onClick}) => {
    return (
      <button 
        onClick={onClick}
        className=" flex items-center justify-center bg-hovergreen text-white rounded-full hover:bg-secondary-purple transition-colors"
      >
        <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  };