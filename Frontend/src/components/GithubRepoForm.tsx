import { useAuth0 } from "@auth0/auth0-react";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";


interface GithubRepo {
    id: number;
    name: string;
    html_url: string;
  }

const GithubRepoForm:React.FC<any> = ({ onSubmit }) => {
    const [repoUrl, setRepoUrl] = useState('');
    const { isAuthenticated, loginWithPopup, user, getAccessTokenSilently } = useAuth0();
    const [githubRepos, setGithubRepos] = useState<GithubRepo[] | null>();
    const [isGithubUser, setIsGithubUser] = useState(false);


    


    useEffect(() => {
        if (isAuthenticated && user) {
            checkGithubAuth()
        }
      }, [isAuthenticated, user]);

      const checkGithubAuth = async() => {
        const isGithub = user?.sub?.includes('github') || 
                         user?.identities?.some((identity:any) => identity.provider === 'github');
        setIsGithubUser(isGithub);
        if (isGithub) {
          await fetchGithubRepos();
        }
      };

      const fetchGithubRepos = async () => {

        try {
          const token = await getAccessTokenSilently({ //@ts-ignore
            audience: 'https://api.github.com',
            scope: 'repo read:user',  
          });


          const response = await fetch('https://api.github.com/user/repos', {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json'
            },
          });
          console.log(response)
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Authentication failed. Please ensure your GitHub account is correctly linked.');
            }
            throw new Error(`GitHub API request failed with status ${response.status}`);
          }
          const repos: GithubRepo[] = await response.json();
        //   console.log(repos);
          setGithubRepos(repos);
        } catch (error) {
          console.error('Error fetching GitHub repos:', error);
        } 
      };

      
  
    const handleSubmit = (e:any) => {
      e.preventDefault();
      onSubmit(repoUrl);
    };
  
    const handleImportFromGithub = async () => {
        if (!isAuthenticated || !isGithubUser) { 
   
          await loginWithPopup({
            authorizationParams: {
                connection: 'github',
              }
          });
        } else if (isGithubUser) {
          // Open a modal or dropdown to select from githubRepos
          console.log('Select from:', githubRepos);
          if(!githubRepos){
            await fetchGithubRepos()
          }
          // For simplicity, we'll just use the first repo in the list
          if (githubRepos && githubRepos.length > 0) {
            // setRepoUrl(githubRepos[0].html_url);
          }
        } else {
          console.log('User is not authenticated with GitHub');
          // Here you might want to prompt the user to link their GitHub account
        }
      };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">
            GitHub Repository URL
          </label>
          <input
            type="text"
            id="repoUrl"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex space-x-2">
          <button 
            type="submit" 
            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button 
          type="button" 
          onClick={handleImportFromGithub} 
          className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center"
        >
          <Github className="mr-2 h-4 w-4" /> 
          {!isAuthenticated ? 'Login with GitHub' : 
           isGithubUser ? 'Import from GitHub' : 'Link GitHub Account'}
        </button>
        </div>
      </form>
    );
  };

export default GithubRepoForm;