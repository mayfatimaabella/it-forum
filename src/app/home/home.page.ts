import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

interface UserProfile {
  name: string;
  year: string;
  role: 'Junior' | 'Senior' | 'Faculty' | 'Class Rep';
  avatar?: string;
}

interface Question {
  title: string;
  subject: string;
  timeAgo: string;
}

interface Resource {
  title: string;
  type: string;
  timeAgo: string;
}

interface Announcement {
  title: string;
  excerpt: string;
  priority: 'high' | 'medium' | 'low';
  timeAgo: string;
  author: string;
}

interface Activity {
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  type: 'question' | 'answer' | 'resource' | 'announcement';
  timeAgo: string;
  actionable: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isDarkMode = false;
  unreadNotifications = 3;
  unreadAnnouncements = 2;

  userProfile: UserProfile = {
    name: 'John Doe',
    year: '3rd',
    role: 'Junior',
    avatar: ''
  };

  stats = {
    totalQuestions: 156,
    activeMembers: 89,
    resources: 234,
    announcements: 12
  };

  mentorshipStats = {
    availableMentors: 15,
    activeSessions: 8
  };

  recentQuestions: Question[] = [
    {
      title: 'Help with Binary Search Tree implementation',
      subject: 'Data Structures',
      timeAgo: '2 hours ago'
    },
    {
      title: 'Understanding Angular Components',
      subject: 'Web Development',
      timeAgo: '4 hours ago'
    },
    {
      title: 'Java OOP Concepts clarification',
      subject: 'Programming',
      timeAgo: '6 hours ago'
    }
  ];

  recentResources: Resource[] = [
    {
      title: 'Algorithm Cheat Sheet',
      type: 'Notes',
      timeAgo: '1 day ago'
    },
    {
      title: 'Java Practice Problems',
      type: 'Code',
      timeAgo: '2 days ago'
    }
  ];

  recentAnnouncements: Announcement[] = [
    {
      title: 'Final Exam Schedule Released',
      excerpt: 'Check the updated schedule for all IT subjects...',
      priority: 'high',
      timeAgo: '1 hour ago',
      author: 'Prof. Smith'
    },
    {
      title: 'Programming Contest Registration',
      excerpt: 'Sign up for the annual coding competition...',
      priority: 'medium',
      timeAgo: '1 day ago',
      author: 'IT Department'
    }
  ];

  recentActivity: Activity[] = [
    {
      user: { name: 'Sarah Johnson' },
      action: 'answered your question about React Hooks',
      type: 'answer',
      timeAgo: '30 minutes ago',
      actionable: true
    },
    {
      user: { name: 'Mike Chen' },
      action: 'shared a new algorithm visualization',
      type: 'resource',
      timeAgo: '2 hours ago',
      actionable: true
    },
    {
      user: { name: 'Prof. Rodriguez' },
      action: 'posted an important announcement',
      type: 'announcement',
      timeAgo: '3 hours ago',
      actionable: true
    }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  openProfile() {
    // Navigate to profile page
    this.router.navigate(['/profile']);
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'Faculty': return 'school';
      case 'Senior': return 'star';
      case 'Class Rep': return 'ribbon';
      default: return 'person';
    }
  }

  getSubjectColor(subject: string): string {
    const colors: { [key: string]: string } = {
      'Data Structures': 'primary',
      'Web Development': 'secondary',
      'Programming': 'tertiary',
      'Database': 'success',
      'Networking': 'warning'
    };
    return colors[subject] || 'medium';
  }

  getActivityColor(type: string): string {
    const colors: { [key: string]: string } = {
      'question': 'primary',
      'answer': 'success',
      'resource': 'secondary',
      'announcement': 'warning'
    };
    return colors[type] || 'medium';
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'question': 'help-circle',
      'answer': 'checkmark-circle',
      'resource': 'document',
      'announcement': 'megaphone'
    };
    return icons[type] || 'information-circle';
  }

  // Navigation methods
  navigateToForum() {
    this.router.navigate(['/forum']);
  }

  navigateToResources() {
    this.router.navigate(['/resources']);
  }

  navigateToAnnouncements() {
    this.router.navigate(['/announcements']);
  }

  navigateToMentorship() {
    this.router.navigate(['/mentorship']);
  }

  // Action methods
  async createNewQuestion() {
    const alert = await this.alertController.create({
      header: 'Ask a Question',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Question title'
        },
        {
          name: 'subject',
          type: 'text',
          placeholder: 'Subject (e.g., Data Structures)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Continue',
          handler: (data) => {
            if (data.title && data.subject) {
              this.router.navigate(['/forum/new'], { 
                queryParams: { title: data.title, subject: data.subject }
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async shareResource() {
    const alert = await this.alertController.create({
      header: 'Share Resource',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Resource title'
        },
        {
          name: 'type',
          type: 'text',
          placeholder: 'Type (Notes, Code, Exam)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Continue',
          handler: (data) => {
            if (data.title && data.type) {
              this.router.navigate(['/resources/new'], { 
                queryParams: { title: data.title, type: data.type }
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async createAnnouncement() {
    if (!this.canCreateAnnouncements()) {
      const toast = await this.toastController.create({
        message: 'Only Faculty and Class Representatives can create announcements',
        duration: 3000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    this.router.navigate(['/announcements/new']);
  }

  canCreateAnnouncements(): boolean {
    return this.userProfile.role === 'Faculty' || this.userProfile.role === 'Class Rep';
  }
}
