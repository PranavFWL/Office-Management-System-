import { Layout } from "@/components/Layout";
import { useTheme } from "@/components/ThemeProvider";
import { Settings as SettingsIcon, Moon, Sun, User, Bell, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout 
      title="Settings" 
      subtitle="Manage your account preferences and application settings"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Theme Settings */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-600" />}
            <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium text-foreground">Theme</Label>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <div className="flex items-center space-x-3">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Profile Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@company.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1" />
            </div>
          </div>
          
          <div className="mt-6">
            <Label htmlFor="bio">Bio</Label>
            <textarea 
              id="bio" 
              className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              defaultValue="Senior Project Manager with over 8 years of experience in leading cross-functional teams."
            />
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="glass-card rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Appearance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-500" />
                )}
                <div>
                  <p className="font-medium text-gray-800">Theme</p>
                  <p className="text-sm text-gray-600">Choose between light and dark mode</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleTheme}
              >
                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass-card rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive email updates about your projects</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Task Reminders</p>
                <p className="text-sm text-gray-600">Get reminded about upcoming task deadlines</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Weekly Reports</p>
                <p className="text-sm text-gray-600">Receive weekly progress reports</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass-card rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="mt-1" />
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="flex justify-end">
          <Button className="px-8">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
}
