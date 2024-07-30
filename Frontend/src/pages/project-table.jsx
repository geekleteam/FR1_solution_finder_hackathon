import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp,Download,SquarePen} from 'lucide-react';
import { Button } from 'react-aria-components';
import FloatingChatbot from '~/components/FloatingChatbot';
import Modal from '~/components/Model';
import GithubRepoForm from '~/components/GithubRepoForm';

const Spoiler = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md mt-4">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 border-t">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
      )}
    </div>
  );
};

const TableScreen = () => {
  const [activeTab, setActiveTab] = useState('Fast');
  const [selectedTools, setSelectedTools] = useState({});
  const [exportedData, setExportedData] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const [groupOrder,setGroupOrder] = useState(['Frontend', 'Backend', 'Database', 'Cloud']);
  const [subGroupOrder,setSubGroupOrder] = useState({
    'Frontend': ['React', 'Vue'],
    'Backend': ['Node.js', 'Python']
  })
  const [tabs,setTabs] = useState([
    { id: 'Fast', label: 'Fast tech stack',data: [
      { 'name': 'create-react-app', 'group': 'Frontend', 'subGroup': 'React', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Moderate', 'costEfficiency': 'High' },
      { 'name': 'React To-do App', 'group': 'Frontend', 'subGroup': 'React', 'isKillerFeature': true, 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Low', 'costEfficiency': 'High' },
      { 'name': 'create-vue', 'group': 'Frontend', 'subGroup': 'Vue', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Moderate', 'learningCurve': 'Low', 'costEfficiency': 'High' },
      { 'name': 'Vue To-do App', 'group': 'Frontend', 'subGroup': 'Vue', 'isKillerFeature': true, 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Moderate', 'learningCurve': 'Low', 'costEfficiency': 'High' },
      { 'name': 'Node.js', 'group': 'Backend', 'subGroup': 'Node.js', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Moderate', 'costEfficiency': 'High' },
      { 'name': 'Express.js', 'group': 'Backend', 'subGroup': 'Node.js', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Moderate', 'costEfficiency': 'High' },
      { 'name': 'Flask', 'group': 'Backend', 'subGroup': 'Python', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Moderate', 'costEfficiency': 'High' },
      { 'name': 'Django', 'group': 'Backend', 'subGroup': 'Python', 'performance': true, 'easeOfUse': true, 'scalability': false, 'ecosystem': 'Large', 'learningCurve': 'Low', 'costEfficiency': 'High' },
      { 'name': 'MongoDB', 'group': 'Database', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Low', 'costEfficiency': 'Moderate' },
      { 'name': 'AWS', 'group': 'Cloud', 'performance': true, 'easeOfUse': false, 'scalability': true, 'ecosystem': 'Very Large', 'learningCurve': 'High', 'costEfficiency': 'Moderate' },
      { 'name': 'Vercel', 'group': 'Cloud', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Growing', 'learningCurve': 'Low', 'costEfficiency': 'High' },
    ] },
    { id: 'easy', label: 'Easy tech tab',data:[
      { 'name': 'create-react-app', 'group': 'Frontend', 'subGroup': 'React', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Moderate', 'costEfficiency': 'High' },
      { 'name': 'React To-do App', 'group': 'Frontend', 'subGroup': 'React', 'isKillerFeature': true, 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Low', 'costEfficiency': 'High' },
      { 'name': 'Node.js', 'group': 'Backend', 'subGroup': 'Node.js', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Moderate', 'costEfficiency': 'High' },
      { 'name': 'Express.js', 'group': 'Backend', 'subGroup': 'Node.js', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Moderate', 'costEfficiency': 'High' },
      { 'name': 'MongoDB', 'group': 'Database', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Large', 'learningCurve': 'Low', 'costEfficiency': 'Moderate' },
      { 'name': 'Vercel', 'group': 'Cloud', 'performance': true, 'easeOfUse': true, 'scalability': true, 'ecosystem': 'Growing', 'learningCurve': 'Low', 'costEfficiency': 'High' },
    ] },
  ])

  const [currentRowForRepUrl,setCurrentRowForRepUrl] = useState();
  const [isModal,setIsModal] = useState(false);


  //get repo from import or the url
  const handleRepoSubmit = (url) => {
    console.log('Submitted repo URL:', url);
    setIsModal(false);
    setTabs(prev => {

      const currentObj =  prev.filter(tab => tab.id === activeTab)[0];
      const prevData = currentObj.data.filter(obj => obj.name !== currentRowForRepUrl.name)

      setCurrentRowForRepUrl()
      return [
        ...prev.filter(tab => tab.id !== activeTab),
        {id:activeTab,label:currentObj.label,data:[
          ...prevData,
          {...currentRowForRepUrl,repoUrl:url}
        ]}
        
      ]

    })
  };

  //pass to AI chatbot
  const setTableData = (newTabs,newGroupOrder,newSubGroupOrder) => {
    setActiveTab(newTabs[0].id)
    setGroupOrder(newGroupOrder);
    setSubGroupOrder(newSubGroupOrder);
    setTabs(newTabs);

  }

  const handleLaunch = (techName) => {
    console.log(`Launching ${techName}`);
    // Add your launch logic here
  };

  const handleRadioChange = (group, techName) => {
    setSelectedTools(prev => ({
      ...prev,
      [group]: {
        ...prev,
        [group]: techName
      }
    }));
  };


  const exportJSON = () => {
    const exportData = {};
    Object.entries(selectedTools).forEach(([group, subGroups]) => {
      exportData[group] = {};
      Object.entries(subGroups).forEach(([subGroup, techName]) => {
        const tech = tabs.find(tab => tab.id === activeTab).data.find(t => t.name === techName);
        if (tech) {
          exportData[group][subGroup] = {
            name: tech.name,
            performance: tech.performance,
            easeOfUse: tech.easeOfUse,
            scalability: tech.scalability,
            ecosystem: tech.ecosystem,
            learningCurve: tech.learningCurve,
            costEfficiency: tech.costEfficiency,
            isKillerFeature: tech.isKillerFeature || false
          };
        }
      });
    });
    const jsonString = JSON.stringify(exportData, null, 2);
    setExportedData(jsonString);
  };

  const exportCSV = () => {
    const headers = ['Group', 'Sub-group', 'Name', 'Performance', 'Ease of Use', 'Scalability', 'Ecosystem', 'Learning Curve', 'Cost Efficiency', 'Is Killer Feature','Repo Url'];
    const csvRows = [headers];
    const label = tabs.find(tab => tab.id === activeTab).label


    Object.entries(selectedTools).forEach(([group, subGroups]) => {
      Object.entries(subGroups).forEach(([subGroup, techName]) => {
        const tech = tabs.find(tab => tab.id === activeTab).data.find(t => t.name === techName);
        if (tech) {
          csvRows.push([
            group,
            subGroup === 'default' ? '' : subGroup,
            tech.name,
            tech.performance ? 'Yes' : 'No',
            tech.easeOfUse ? 'Yes' : 'No',
            tech.scalability ? 'Yes' : 'No',
            tech.ecosystem,
            tech.learningCurve,
            tech.costEfficiency,
            tech.isKillerFeature ? 'Yes' : 'No',
            tech.repoUrl ? tech.repoUrl : ''
          ]);
        }
      });
    });

    const csvContent = csvRows.map(row => row.join(',')).join('\n');


    // const csvContent = csvRows.map(row => row.map(cell => {
    //   // Escape double quotes and wrap cells containing commas in quotes
    //   if (cell.includes('"') || cell.includes(',')) {
    //     return `"${cell.replace(/"/g, '""')}"`;
    //   }
    //   return cell;
    // }).join(',')).join('\n');

        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a download link
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', `${label}.csv`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        // setExportedData(csvContent);
        // setPreviewData(csvRows);

  };

  return (<>
    <div className="container mx-auto p-4 bg-white">
      
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>


      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Group</th>
              <th className="border p-2">Sub-group</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Performance</th>
              <th className="border p-2">Ease of Use</th>
              <th className="border p-2">Scalable</th>
              <th className="border p-2">Ecosystem</th>
              <th className="border p-2">Learning Curve</th>
              <th className="border p-2">Cost Efficiency</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {groupOrder.map(group => (
              <React.Fragment key={group}>
                {subGroupOrder[group] ? (
                  subGroupOrder[group].map((subGroup, subGroupIndex) => (
                    <React.Fragment key={subGroup}>
                    {tabs.find(tab => tab.id === activeTab).data
                        .filter(row => row.group === group && row.subGroup === subGroup)
                      .map((row, rowIndex, filteredRows) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                          {subGroupIndex === 0 && rowIndex === 0 && (
                              <td className="border p-2 font-bold" rowSpan={subGroupOrder[group].reduce((acc, sg) => acc + tabs.find(tab => tab.id === activeTab).data.filter(row => row.group === group && row.subGroup === sg).length, 0)}>
                                {group}
                              </td>
                            )}
                            {rowIndex === 0 && (
                              <td className="border p-2 font-semibold" rowSpan={filteredRows.length}>
                                {subGroup}
                            </td>
                          )}
                          <td className="border p-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name={group} // Group as the name attribute for radio buttons
                                checked={selectedTools[group]?.[group] === row.name}
                                onChange={() => handleRadioChange(group, row.name)}
                                className="mr-2"
                              />
                              {row?.repoUrl ? row?.repoUrl : row.name}
                              {row.isKillerFeature && (<><SquarePen onClick={()=>{setCurrentRowForRepUrl(row);setIsModal(true);}} size={40} className='cursor-pointer scale-95 hover:scale-100 transition-all duration-300 hover:text-secondary-pink'/>
                                <span className="ml-2 text-xs font-semibold text-green-600">Killer Feature</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="border p-2 text-center">{row.performance ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                          <td className="border p-2 text-center">{row.easeOfUse ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                          <td className="border p-2 text-center">{row.scalability ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                          <td className="border p-2">{row.ecosystem}</td>
                          <td className="border p-2">{row.learningCurve}</td>
                          <td className="border p-2">{row.costEfficiency}</td>
                          <td className="border p-2 text-center">
                            <Button onClick={() => handleLaunch(row.name)} className=" text-white px-4 py-2 rounded bg-red-500">Launch it</Button>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))
            ) : (
              tabs.find(tab => tab.id === activeTab).data
                .filter(row => row.group === group)
                .map((row, rowIndex, filteredRows) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                    {rowIndex === 0 && (
                      <td className="border p-2 font-bold" rowSpan={filteredRows.length}>
                        {group}
                      </td>
                    )}
                    <td className="border p-2 font-semibold text-center">{row.subGroup || '-'}</td>
                    <td className="border p-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name={group} // Group as the name attribute for radio buttons
                          checked={selectedTools[group]?.[group] === row.name}
                          onChange={() => handleRadioChange(group, row.name)}
                          className="mr-2"
                        />
                        {row.name}
                        {row.isKillerFeature && (
                          <span className="ml-2 text-xs font-semibold text-green-600">Killer Feature</span>
                        )}
                      </div>
                    </td>
                    <td className="border p-2 text-center">{row.performance ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                    <td className="border p-2 text-center">{row.easeOfUse ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                    <td className="border p-2 text-center">{row.scalability ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                    <td className="border p-2">{row.ecosystem}</td>
                    <td className="border p-2">{row.learningCurve}</td>
                    <td className="border p-2">{row.costEfficiency}</td>
                    <td className="border p-2 text-center">
                      -
                    </td>
                  </tr>
                ))
            )}              
            </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      

      
      {exportedData && (
        <>
          <Spoiler title="Exported Tech Stack (CSV)" content={exportedData} />
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {previewData[0].map((header, index) => (
                      <th key={index} className="border p-2">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border p-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
            <div className="flex justify-start mb-2">
        <Button onClick={exportCSV} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
        <Download size={20} /> Export Selected Tech Stack (CSV)
        </Button>
      </div>
    </div>
    <FloatingChatbot currentData={{tabs,subGroupOrder,groupOrder}} setTableData={setTableData} />
    <Modal isOpen={isModal}>
    <button onClick={()=>setIsModal(false)} className="absolute top-0 right-0 text-red-500 hover:text-red-700">
            <X size={24} />
          </button>

    <GithubRepoForm  onSubmit={handleRepoSubmit} />
    </Modal>
    </>
  );
};

export default TableScreen;