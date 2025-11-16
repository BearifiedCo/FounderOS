#!/usr/bin/env python3
"""
FounderOS Step 2: Notion Architecture Builder
Creates all databases and sample data for the FounderOS workspace.

Requirements:
    pip install notion-client

Usage:
    export NOTION_TOKEN="your_integration_token"
    export NOTION_PARENT_PAGE_ID="your_parent_page_id"
    python step-2-notion-api-script.py
"""

import os
import json
from datetime import datetime, timedelta
from notion_client import Client
from typing import Dict, List, Optional

# Initialize Notion client
notion = Client(auth=os.environ.get("NOTION_TOKEN"))
PARENT_PAGE_ID = os.environ.get("NOTION_PARENT_PAGE_ID")

if not PARENT_PAGE_ID:
    raise ValueError("NOTION_PARENT_PAGE_ID environment variable is required")


class NotionDatabaseBuilder:
    """Builder class for creating Notion databases with proper schemas."""
    
    def __init__(self, client: Client, parent_page_id: str):
        self.client = client
        self.parent_page_id = parent_page_id
        self.created_databases = {}
    
    def create_page(self, title: str, icon: Optional[str] = None) -> str:
        """Create a new page in the parent workspace."""
        page_data = {
            "parent": {"page_id": self.parent_page_id},
            "properties": {
                "title": {
                    "title": [{"text": {"content": title}}]
                }
            }
        }
        
        if icon:
            page_data["icon"] = {"emoji": icon}
        
        page = self.client.pages.create(**page_data)
        return page["id"]
    
    def create_database(
        self,
        parent_id: str,
        title: str,
        schema: Dict,
        description: Optional[str] = None
    ) -> str:
        """Create a database with the specified schema."""
        properties = {}
        
        for prop_name, prop_config in schema.items():
            properties[prop_name] = prop_config
        
        database_data = {
            "parent": {"page_id": parent_id},
            "title": [{"text": {"content": title}}],
            "properties": properties
        }
        
        if description:
            # Add description as a text block after creation
            pass
        
        database = self.client.databases.create(**database_data)
        self.created_databases[title] = database["id"]
        return database["id"]
    
    def add_page_content(self, page_id: str, content: List[Dict]):
        """Add content blocks to a page."""
        self.client.blocks.children.append(block_id=page_id, children=content)


def get_products_schema(database_ids: Dict) -> Dict:
    """Get the Products database schema."""
    return {
        "Name": {"title": {}},
        "Status": {
            "select": {
                "options": [
                    {"name": "Active", "color": "green"},
                    {"name": "In Development", "color": "yellow"},
                    {"name": "Paused", "color": "orange"},
                    {"name": "Sunset", "color": "red"}
                ]
            }
        },
        "Type": {
            "select": {
                "options": [
                    {"name": "Product", "color": "blue"},
                    {"name": "Token", "color": "purple"},
                    {"name": "Ecosystem", "color": "pink"}
                ]
            }
        },
        "Description": {"rich_text": {}},
        "GitHub Repo": {"url": {}},
        "Linear Team": {"url": {}},
        "Slack Channel": {"url": {}},
        "Figma Design": {"url": {}},
        "Production URL": {"url": {}},
        "Team Members": {
            "relation": {
                "database_id": database_ids.get("Team"),
                "single_property": {}
            }
        },
        "Created": {"created_time": {}},
        "Last Updated": {"last_edited_time": {}}
    }


def get_projects_schema(database_ids: Dict) -> Dict:
    """Get the Projects database schema."""
    return {
        "Name": {"title": {}},
        "Product": {
            "relation": {
                "database_id": database_ids.get("Products"),
                "single_property": {}
            }
        },
        "Status": {
            "select": {
                "options": [
                    {"name": "Planning", "color": "gray"},
                    {"name": "In Spec", "color": "blue"},
                    {"name": "In Progress", "color": "yellow"},
                    {"name": "Shipped", "color": "green"},
                    {"name": "Delayed", "color": "red"},
                    {"name": "Archived", "color": "default"}
                ]
            }
        },
        "Priority": {
            "select": {
                "options": [
                    {"name": "P0-Critical", "color": "red"},
                    {"name": "P1-High", "color": "orange"},
                    {"name": "P2-Medium", "color": "yellow"},
                    {"name": "P3-Low", "color": "blue"}
                ]
            }
        },
        "Quarter": {
            "select": {
                "options": [
                    {"name": "Q1 2025", "color": "blue"},
                    {"name": "Q2 2025", "color": "green"},
                    {"name": "Q3 2025", "color": "yellow"},
                    {"name": "Q4 2025", "color": "orange"},
                    {"name": "Backlog", "color": "gray"}
                ]
            }
        },
        "Owner": {"people": {}},
        "Team Members": {
            "relation": {
                "database_id": database_ids.get("Team"),
                "single_property": {}
            }
        },
        "Linear Epic": {"url": {}},
        "GitHub Milestone": {"url": {}},
        "Target Date": {"date": {}},
        "Completion %": {"number": {"format": "percent"}},
        "Dependencies": {
            "relation": {
                "database_id": database_ids.get("Projects"),
                "single_property": {}
            }
        },
        "Description": {"rich_text": {}},
        "Created": {"created_time": {}},
        "Last Updated": {"last_edited_time": {}}
    }


def get_tasks_schema(database_ids: Dict) -> Dict:
    """Get the Tasks database schema."""
    return {
        "Name": {"title": {}},
        "Project": {
            "relation": {
                "database_id": database_ids.get("Projects"),
                "single_property": {}
            }
        },
        "Status": {
            "select": {
                "options": [
                    {"name": "Backlog", "color": "gray"},
                    {"name": "Todo", "color": "blue"},
                    {"name": "In Progress", "color": "yellow"},
                    {"name": "Review", "color": "orange"},
                    {"name": "Done", "color": "green"},
                    {"name": "Blocked", "color": "red"}
                ]
            }
        },
        "Priority": {
            "select": {
                "options": [
                    {"name": "P0-Critical", "color": "red"},
                    {"name": "P1-High", "color": "orange"},
                    {"name": "P2-Medium", "color": "yellow"},
                    {"name": "P3-Low", "color": "blue"}
                ]
            }
        },
        "Assignee": {"people": {}},
        "Team Members": {
            "relation": {
                "database_id": database_ids.get("Team"),
                "single_property": {}
            }
        },
        "Linear Issue": {"url": {}},
        "Due Date": {"date": {}},
        "Estimated Hours": {"number": {}},
        "Actual Hours": {"number": {}},
        "Tags": {
            "multi_select": {
                "options": [
                    {"name": "frontend", "color": "blue"},
                    {"name": "backend", "color": "green"},
                    {"name": "design", "color": "purple"},
                    {"name": "bug", "color": "red"},
                    {"name": "feature", "color": "yellow"}
                ]
            }
        },
        "Dependencies": {
            "relation": {
                "database_id": database_ids.get("Tasks"),
                "single_property": {}
            }
        },
        "Description": {"rich_text": {}},
        "Created": {"created_time": {}},
        "Last Updated": {"last_edited_time": {}}
    }


def get_team_schema(database_ids: Dict) -> Dict:
    """Get the Team database schema."""
    return {
        "Name": {"title": {}},
        "Email": {"email": {}},
        "Role": {
            "select": {
                "options": [
                    {"name": "Founder/CEO", "color": "red"},
                    {"name": "Developer", "color": "blue"},
                    {"name": "Designer", "color": "purple"},
                    {"name": "Marketer", "color": "green"},
                    {"name": "Advisor", "color": "yellow"},
                    {"name": "Community Manager", "color": "pink"},
                    {"name": "Contributor", "color": "gray"}
                ]
            }
        },
        "Status": {
            "select": {
                "options": [
                    {"name": "Active", "color": "green"},
                    {"name": "Occasional", "color": "yellow"},
                    {"name": "Alumni", "color": "gray"}
                ]
            }
        },
        "Products": {
            "multi_select": {
                "options": [
                    {"name": "BEARO", "color": "blue"},
                    {"name": "AlphaBuilder", "color": "green"},
                    {"name": "Primape", "color": "purple"},
                    {"name": "Chimpanion", "color": "yellow"},
                    {"name": "BEARCO/APES", "color": "red"}
                ]
            }
        },
        "Skills": {
            "multi_select": {
                "options": [
                    {"name": "React", "color": "blue"},
                    {"name": "Solidity", "color": "green"},
                    {"name": "Design", "color": "purple"},
                    {"name": "Marketing", "color": "pink"},
                    {"name": "Product", "color": "red"},
                    {"name": "Strategy", "color": "yellow"}
                ]
            }
        },
        "GitHub": {"url": {}},
        "Discord/Telegram": {"rich_text": {}},
        "Linear Access": {"checkbox": {}},
        "Compensation": {
            "select": {
                "options": [
                    {"name": "Token", "color": "yellow"},
                    {"name": "Cash", "color": "green"},
                    {"name": "Equity", "color": "blue"},
                    {"name": "Volunteer", "color": "gray"}
                ]
            }
        },
        "Start Date": {"date": {}},
        "Notes": {"rich_text": {}},
        "Created": {"created_time": {}}
    }


def get_crm_schema(database_ids: Dict) -> Dict:
    """Get the CRM database schema."""
    return {
        "Name": {"title": {}},
        "Email": {"email": {}},
        "Company": {"rich_text": {}},
        "Type": {
            "select": {
                "options": [
                    {"name": "Lead", "color": "blue"},
                    {"name": "Customer", "color": "green"},
                    {"name": "Partner", "color": "purple"},
                    {"name": "Investor", "color": "yellow"},
                    {"name": "Advisor", "color": "orange"}
                ]
            }
        },
        "Status": {
            "select": {
                "options": [
                    {"name": "Active", "color": "green"},
                    {"name": "Nurturing", "color": "yellow"},
                    {"name": "Cold", "color": "gray"},
                    {"name": "Converted", "color": "blue"},
                    {"name": "Lost", "color": "red"}
                ]
            }
        },
        "Product Interest": {
            "multi_select": {
                "options": [
                    {"name": "BEARO", "color": "blue"},
                    {"name": "AlphaBuilder", "color": "green"},
                    {"name": "Primape", "color": "purple"},
                    {"name": "Chimpanion", "color": "yellow"},
                    {"name": "BEARCO/APES", "color": "red"}
                ]
            }
        },
        "Source": {
            "select": {
                "options": [
                    {"name": "Inbound", "color": "green"},
                    {"name": "Outbound", "color": "blue"},
                    {"name": "Referral", "color": "purple"},
                    {"name": "Event", "color": "yellow"},
                    {"name": "Social Media", "color": "pink"}
                ]
            }
        },
        "Last Contact": {"date": {}},
        "Deal Value": {"number": {"format": "dollar"}},
        "Gmail Thread": {"url": {}},
        "Notes": {"rich_text": {}},
        "Created": {"created_time": {}},
        "Last Updated": {"last_edited_time": {}}
    }


def get_content_machine_schema(database_ids: Dict) -> Dict:
    """Get the Content Machine database schema."""
    return {
        "Title": {"title": {}},
        "Type": {
            "select": {
                "options": [
                    {"name": "Blog", "color": "blue"},
                    {"name": "Twitter Thread", "color": "green"},
                    {"name": "Video", "color": "red"},
                    {"name": "Tutorial", "color": "purple"},
                    {"name": "Announcement", "color": "yellow"},
                    {"name": "Newsletter", "color": "pink"}
                ]
            }
        },
        "Status": {
            "select": {
                "options": [
                    {"name": "Idea", "color": "gray"},
                    {"name": "Drafting", "color": "yellow"},
                    {"name": "Review", "color": "orange"},
                    {"name": "Scheduled", "color": "blue"},
                    {"name": "Posted", "color": "green"}
                ]
            }
        },
        "Platform": {
            "multi_select": {
                "options": [
                    {"name": "Twitter/X", "color": "blue"},
                    {"name": "LinkedIn", "color": "green"},
                    {"name": "YouTube", "color": "red"},
                    {"name": "Blog", "color": "purple"},
                    {"name": "Discord", "color": "pink"},
                    {"name": "Newsletter", "color": "yellow"}
                ]
            }
        },
        "Product": {
            "select": {
                "options": [
                    {"name": "BEARO", "color": "blue"},
                    {"name": "AlphaBuilder", "color": "green"},
                    {"name": "Primape", "color": "purple"},
                    {"name": "Chimpanion", "color": "yellow"},
                    {"name": "Ecosystem", "color": "red"},
                    {"name": "General", "color": "gray"}
                ]
            }
        },
        "Author": {"people": {}},
        "Publish Date": {"date": {}},
        "Content": {"rich_text": {}},
        "Links": {"url": {}},
        "Engagement": {"number": {}},
        "Thread/Series": {
            "relation": {
                "database_id": database_ids.get("Content Machine"),
                "single_property": {}
            }
        },
        "Created": {"created_time": {}},
        "Last Updated": {"last_edited_time": {}}
    }


def main():
    """Main execution function."""
    print("🚀 Starting FounderOS Step 2: Notion Architecture Builder\n")
    
    builder = NotionDatabaseBuilder(notion, PARENT_PAGE_ID)
    
    # Step 1: Create Command Center page
    print("📄 Creating Command Center page...")
    command_center_id = builder.create_page(
        "FounderOS — BearifiedCo Command Center",
        icon="🚀"
    )
    print(f"✅ Command Center created: {command_center_id}\n")
    
    # Add architecture blueprint content
    blueprint_content = [
        {
            "object": "block",
            "type": "heading_1",
            "heading_1": {
                "rich_text": [{"text": {"content": "FounderOS — BearifiedCo Command Center"}}]
            }
        },
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [{"text": {"content": "🎯 Mission"}}]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [{
                    "text": {
                        "content": "Single source of truth for all products, projects, tasks, team members, and content across the BearifiedCo ecosystem."
                    }
                }]
            }
        }
    ]
    builder.add_page_content(command_center_id, blueprint_content)
    
    # Step 2: Create all databases
    print("🗂️  Creating databases...")
    
    # Note: We need to create databases in order due to relation dependencies
    # First pass: Create databases without relations
    database_ids = {}
    
    # Create Team first (no dependencies)
    print("  → Creating Team database...")
    team_schema = get_team_schema({})
    database_ids["Team"] = builder.create_database(
        command_center_id,
        "🗂️ Team",
        team_schema
    )
    
    # Create Products (depends on Team)
    print("  → Creating Products database...")
    products_schema = get_products_schema(database_ids)
    database_ids["Products"] = builder.create_database(
        command_center_id,
        "🗂️ Products",
        products_schema
    )
    
    # Create Projects (depends on Products and Team)
    print("  → Creating Projects database...")
    projects_schema = get_projects_schema(database_ids)
    database_ids["Projects"] = builder.create_database(
        command_center_id,
        "🗂️ Projects",
        projects_schema
    )
    
    # Create Tasks (depends on Projects and Team)
    print("  → Creating Tasks database...")
    tasks_schema = get_tasks_schema(database_ids)
    database_ids["Tasks"] = builder.create_database(
        command_center_id,
        "🗂️ Tasks",
        tasks_schema
    )
    
    # Create CRM (no dependencies)
    print("  → Creating CRM database...")
    crm_schema = get_crm_schema({})
    database_ids["CRM"] = builder.create_database(
        command_center_id,
        "🗂️ CRM",
        crm_schema
    )
    
    # Create Content Machine (depends on itself for thread relation)
    print("  → Creating Content Machine database...")
    content_schema = get_content_machine_schema(database_ids)
    database_ids["Content Machine"] = builder.create_database(
        command_center_id,
        "🗂️ Content Machine",
        content_schema
    )
    
    print("✅ All databases created!\n")
    
    # Step 3: Create Product Hub stubs
    print("📁 Creating Product Hub stubs...")
    hubs = [
        ("BEARO Hub", "🐻"),
        ("AlphaBuilder Hub", "🏗️"),
        ("Primape Hub", "🐵"),
        ("Chimpanion Hub", "🦧"),
        ("BEARCO Ecosystem Hub", "🌐")
    ]
    
    for hub_name, icon in hubs:
        builder.create_page(hub_name, icon=icon)
        print(f"  ✅ Created {hub_name}")
    
    # Step 4: Create Founder Dashboard stub
    print("\n🧠 Creating Founder Dashboard stub...")
    builder.create_page("🧠 Founder Dashboard", icon="🧠")
    print("✅ Founder Dashboard created\n")
    
    print("=" * 60)
    print("✅ Step 2 Implementation Complete!")
    print("=" * 60)
    print("\n📋 Next Steps:")
    print("1. Add sample data manually or via API")
    print("2. Configure database views")
    print("3. Test relation links")
    print("4. Proceed to Step 3: Populate Product Hubs")
    print(f"\n🔗 Command Center Page ID: {command_center_id}")
    print(f"📊 Database IDs: {json.dumps(database_ids, indent=2)}")


if __name__ == "__main__":
    main()
