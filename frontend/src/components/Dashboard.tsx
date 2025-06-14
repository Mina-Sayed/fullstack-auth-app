import React from 'react';
import { LogOut, Shield, Lock, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-slate-900">EasyGen App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-700">
                Welcome, <span className="font-medium">{user?.name}</span>
              </span>
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome to EasyGen!</CardTitle>
              <CardDescription>
                You have successfully authenticated and accessed the protected application.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* User Information Card */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-slate-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-slate-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    User ID
                  </label>
                  <p className="mt-1 text-sm text-slate-900 font-mono text-xs">{user?.id}</p>
                </div>
              </CardContent>
            </Card>

            {/* Feature Cards */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <CardTitle className="text-lg font-medium text-slate-900">
                      Secure Authentication
                    </CardTitle>
                    <p className="text-sm text-slate-600">JWT Protected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <CardTitle className="text-lg font-medium text-slate-900">
                      Password Security
                    </CardTitle>
                    <p className="text-sm text-slate-600">bcrypt Hashed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <CardTitle className="text-lg font-medium text-slate-900">
                    Modern User Experience
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    Built with React, TypeScript, shadcn/ui, and Tailwind CSS for a beautiful, responsive interface
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
