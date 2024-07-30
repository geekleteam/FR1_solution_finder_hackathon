import requests
import json
import re

from dotenv import load_dotenv
load_dotenv()  # noqa
from os import environ as env

class SandboxService():
    OWNER_ID = "e731c7a6-2843-472b-8d08-18599509a14c"
    ORGANIZATION_ID = "cfa4c64b-7fc1-45c5-a248-eb03e4632118"

    def __init__(self) -> None:
        return
    
    def is_valid_url(self, url):
        # Simple regex for URL validation
        regex = re.compile(
            r'^(?:http|ftp)s?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
            r'localhost|'  # localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # ...or ipv4
            r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # ...or ipv6
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        return re.match(regex, url) is not None

    def create_sandbox(self, contextUrl):
        if not self.is_valid_url(contextUrl):
            return "Invalid Context URL"

        url = "https://api.gitpod.io/gitpod.v1.WorkspaceService/CreateAndStartWorkspace"

        payload = json.dumps({
        "contextUrl": {
            "url": contextUrl,
            "workspaceClass": "g1-standard",
            "editor": {
            "name": "code",
            "version": "latest"
            }
        },
        "metadata": {
            "ownerId": self.OWNER_ID,
            "organizationId": self.ORGANIZATION_ID
        }
        })
        headers = {
            'Authorization': f'Bearer { env.get("GITPOD_API_KEY") }',
            'content-type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print(response)

        if response.status_code != 200:
            return "Error creating sandbox"

        return response.text

    def get_sandbox(self, sandboxId):
        url = "https://api.gitpod.io/gitpod.v1.WorkspaceService/GetWorkspace"

        payload = json.dumps({
            "workspaceId": sandboxId
        })
        headers = {
            'Authorization': f'Bearer { env.get("GITPOD_API_KEY") }',
            'content-type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)

        if response.status_code != 200:
            return "Error getting sandbox"
        
        return response.text
