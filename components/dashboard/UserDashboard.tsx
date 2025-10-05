import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { 
  Users, 
  TrendingUp, 
  Settings, 
  Smartphone, 
  CreditCard,
  Award,
  User,
  Copy,
  LogOut,
  Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [copiedReferral, setCopiedReferral] = useState(false);

  const handleCopyReferralCode = () => {
    const referralCode = user?.referral_code || 'CAREER2024';
    navigator.clipboard.writeText(referralCode);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleSignOut = async () => {
    // Add sign out logic here
    const { supabase } = await import('@/lib/supabase');
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleLaunchTool = (toolName: string, url: string, departmentId: string) => {
    // Open the tool in a new tab instead of redirecting to payment
    console.log(`Launching ${toolName} from ${departmentId}`);
    
    // Track tool usage (you can add analytics here)
    console.log(`Tool launched: ${toolName} - ${url}`);
    
    // Open the tool in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const mockDepartments = [
    {
      id: 'hr',
      name: 'Human Resources',
      description: 'Master recruitment, employee management, and organizational development',
      icon: Users,
      color: 'bg-blue-500',
      specializedTool: {
        name: 'HRMS System',
        url: 'https://hrms-pi-virid.vercel.app/',
        description: 'Complete Human Resource Management System'
      },
      tools: [
        { name: 'HR Workflow Management', url: 'https://hr-workflow-gamma.vercel.app/', description: 'Streamline HR processes' },
        { name: 'Application Tracking', url: 'https://applicatrion-tracking.vercel.app/', description: 'Track job applications' },
        { name: 'Email Marketing', url: 'https://email-marketing-theta-five.vercel.app/', description: 'HR email campaigns' },
        { name: 'Study Pathways', url: 'https://study-pathways.vercel.app/', description: 'Employee development paths' },
        { name: 'Typing Practice', url: 'https://typing-kappa-gold.vercel.app/', description: 'Improve typing skills' }
      ]
    },
    {
      id: 'finance',
      name: 'Accounting & Finance',
      description: 'Learn financial analysis, budgeting, and strategic planning',
      icon: Award,
      color: 'bg-yellow-500',
      specializedTool: {
        name: 'Accounting System',
        url: 'https://accounting-bwvq.vercel.app/',
        description: 'Professional accounting and bookkeeping'
      },
      tools: [
        { name: 'Tax Submission', url: 'https://tax-submit.vercel.app/', description: 'File taxes electronically' },
        { name: 'Excel Practice', url: 'https://excel-ashen-ten.vercel.app/', description: 'Advanced Excel skills' },
        { name: 'Power BI Analytics', url: 'https://powerbi-livid.vercel.app/', description: 'Business intelligence' },
        { name: 'Business Supply', url: 'https://business-supply.vercel.app/', description: 'Supply chain finance' }
      ]
    },
    {
      id: 'operations',
      name: 'Operations',
      description: 'Optimize processes and improve operational efficiency',
      icon: Settings,
      color: 'bg-purple-500',
      specializedTool: {
        name: 'ERP System',
        url: 'https://erp-omega-blush.vercel.app/',
        description: 'Enterprise Resource Planning'
      },
      tools: [
        { name: 'Odoo ERP', url: 'https://odoo-five.vercel.app/', description: 'Complete business management' },
        { name: 'Operations Tasks', url: 'https://operations-tasks.vercel.app/', description: 'Task management' },
        { name: 'BPM System', url: 'https://bpm-tau.vercel.app/', description: 'Business Process Management' },
        { name: 'Document Management', url: 'https://document-management-ochre.vercel.app/', description: 'Digital document handling' },
        { name: 'AF Workflow', url: 'https://af-workflow.vercel.app/', description: 'Automated workflows' }
      ]
    },
    {
      id: 'sales',
      name: 'Sales & Marketing',
      description: 'Develop persuasive communication and strategic selling skills',
      icon: TrendingUp,
      color: 'bg-green-500',
      specializedTool: {
        name: 'CRM System',
        url: 'https://ghl-crm.vercel.app/',
        description: 'Customer Relationship Management'
      },
      tools: [
        { name: 'Sales Workflow', url: 'https://sales-workflow.vercel.app/', description: 'Sales process automation' },
        { name: 'E-commerce Platform', url: 'https://ecommerce-lac-five.vercel.app/', description: 'Online store management' },
        { name: 'Appointment Booking', url: 'https://appointment-booking-steel.vercel.app/', description: 'Schedule appointments' },
        { name: 'POS System', url: 'https://pos-eight-blush.vercel.app/', description: 'Point of Sale' }
      ]
    },
    {
      id: 'common',
      name: 'Essential Tools',
      description: 'Common tools everyone should know for professional success',
      icon: Crown,
      color: 'bg-indigo-500',
      specializedTool: {
        name: 'Project Management',
        url: 'https://project-management-chi-eight.vercel.app/',
        description: 'Professional project management'
      },
      tools: [
        { name: 'Zap Automation', url: 'https://zap-smoky-one.vercel.app/', description: 'Workflow automation' },
        { name: 'Career Roadmap', url: 'https://roadmap-seven-xi.vercel.app/', description: 'Career planning tool' },
        { name: 'Nexux App', url: 'https://nexux-app-delta.vercel.app/', description: 'Business integration' },
        { name: 'Automation Tools', url: 'https://automation-five-pi.vercel.app/', description: 'Business automation' }
      ]
    }
  ];

  const mockReferrals = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'completed',
      joinedAt: '2024-01-15',
      reward: '৳500',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'pending',
      joinedAt: '2024-01-20',
      reward: '৳0',
    },
  ];

  const mockDevices = [
    {
      id: '1',
      name: 'Chrome on Windows',
      lastActive: '2 hours ago',
      isActive: true,
    },
    {
      id: '2',
      name: 'Safari on iPhone',
      lastActive: '1 day ago',
      isActive: true,
    },
  ];

  return (
    <ProtectedRoute requirePayment={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to CareerSim
                </h1>
                <p className="text-gray-600 mt-2">
                  Choose a department to start your professional simulation experience with real-world tools
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={user?.is_paid ? 'default' : 'secondary'} className="px-3 py-1">
                  {user?.is_paid ? 'Premium' : 'Free'}
                </Badge>
                {!user?.is_paid && (
                  <Button onClick={() => window.location.href = '/payment'}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Tabs defaultValue="departments" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="profile">User Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="departments" className="space-y-8">
              {/* Department Cards - Custom Sizing */}
              <div className="flex flex-wrap gap-4 justify-center">
                {mockDepartments.map((department) => {
                  const Icon = department.icon;
                  return (
                    <Card key={department.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md w-[550px] max-w-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${department.color} text-white`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm leading-tight">{department.name}</CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-xs mt-2 line-clamp-2">
                          {department.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {/* Specialized Tool - Featured */}
                          <div>
                            <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="mr-1">⭐</span> Featured Tool:
                            </p>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-blue-900 truncate">
                                    {department.specializedTool.name}
                                  </h4>
                                  <p className="text-xs text-blue-700 mt-1">
                                    {department.specializedTool.description}
                                  </p>
                                </div>
                                <Button 
                                  size="sm" 
                                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-3 flex-shrink-0"
                                  onClick={() => handleLaunchTool(department.specializedTool.name, department.specializedTool.url, department.id)}
                                >
                                  Launch
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Other Tools */}
                          <div>
                            <p className="text-xs font-medium text-gray-700 mb-1">Additional Tools:</p>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {department.tools.map((tool, index) => (
                                <div key={index} className="flex items-center justify-between p-1.5 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                  <div className="flex-1 min-w-0 mr-2">
                                    <span className="text-xs text-gray-700 truncate block">{tool.name}</span>
                                    <span className="text-xs text-gray-500 truncate block">{tool.description}</span>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-xs h-6 px-2 flex-shrink-0"
                                    onClick={() => handleLaunchTool(tool.name, tool.url, department.id)}
                                  >
                                    Visit
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Info Card */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user?.name || 'User'}</h3>
                        <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                        <Badge variant={user?.is_paid ? 'default' : 'secondary'} className="mt-1">
                          {user?.is_paid ? 'Premium Member' : 'Free Member'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Member Since</span>
                        <span className="text-sm font-medium">Jan 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Completed Tools</span>
                        <span className="text-sm font-medium">19</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Progress</span>
                        <span className="text-sm font-medium">47%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Settings Tabs */}
                <Card className="lg:col-span-2">
                  <CardContent className="p-0">
                    <Tabs defaultValue="referrals" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                        <TabsTrigger value="referrals">Referrals</TabsTrigger>
                        <TabsTrigger value="devices">Devices</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="referrals" className="p-6 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Referral Program</h3>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                            <h4 className="font-medium text-blue-900 mb-2">Your Referral Code</h4>
                            <div className="flex items-center space-x-2">
                              <code className="bg-white px-4 py-2 rounded border flex-1 text-center">
                                {user?.referral_code || 'CAREER2024'}
                              </code>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={handleCopyReferralCode}
                              >
                                {copiedReferral ? 'Copied!' : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                            <p className="text-sm text-blue-700 mt-2">
                              Share this code with friends and earn ৳500 for each successful referral!
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Your Referrals</h4>
                          <div className="space-y-3">
                            {mockReferrals.map((referral) => (
                              <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <p className="font-medium">{referral.name}</p>
                                  <p className="text-sm text-gray-600">{referral.email}</p>
                                  <p className="text-xs text-gray-500">Joined {referral.joinedAt}</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                                    {referral.status}
                                  </Badge>
                                  <p className="text-sm font-medium mt-1">{referral.reward}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="devices" className="p-6 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Device Management</h3>
                          <div className="space-y-3">
                            {mockDevices.map((device) => (
                              <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <Smartphone className="h-5 w-5 text-gray-500" />
                                  <div>
                                    <p className="font-medium">{device.name}</p>
                                    <p className="text-sm text-gray-600">Last active {device.lastActive}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={device.isActive ? 'default' : 'secondary'}>
                                    {device.isActive ? 'Active' : 'Inactive'}
                                  </Badge>
                                  <Button size="sm" variant="outline">
                                    Revoke
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-4">
                            You can have up to 2 active devices. Revoke a device to add a new one.
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="settings" className="p-6 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-600">Receive updates about your progress</p>
                              </div>
                              <Button size="sm" variant="outline">
                                Configure
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Privacy Settings</p>
                                <p className="text-sm text-gray-600">Control your data and privacy</p>
                              </div>
                              <Button size="sm" variant="outline">
                                Manage
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Subscription</p>
                                <p className="text-sm text-gray-600">
                                  {user?.is_paid ? 'Premium Active' : 'Free Plan'}
                                </p>
                              </div>
                              <Button 
                                size="sm" 
                                variant={user?.is_paid ? "outline" : "default"}
                                onClick={() => window.location.href = '/payment'}
                              >
                                {user?.is_paid ? 'Manage' : 'Upgrade'}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Button 
                            variant="destructive" 
                            onClick={handleSignOut}
                            className="w-full"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};