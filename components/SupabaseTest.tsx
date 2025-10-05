import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('Testing connection...');
    
    try {
      // Test 1: Basic connection
      const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
      
      if (error) {
        setTestResult(`❌ Connection Error: ${error.message}`);
        return;
      }
      
      // Test 2: Auth service
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        setTestResult(`❌ Auth Error: ${authError.message}`);
        return;
      }
      
      setTestResult('✅ Supabase connection working!');
      
    } catch (err: any) {
      setTestResult(`❌ Network Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSignup = async () => {
    setLoading(true);
    setTestResult('Testing signup...');
    
    try {
      const testEmail = `test${Date.now()}@example.com`;
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123'
      });
      
      if (error) {
        setTestResult(`❌ Signup Error: ${error.message}`);
        return;
      }
      
      setTestResult(`✅ Signup successful! User ID: ${data.user?.id}`);
      
    } catch (err: any) {
      setTestResult(`❌ Signup Network Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg mb-4">
      <h3 className="font-bold text-lg mb-2">🧪 Supabase Connection Tests</h3>
      
      <div className="space-x-2 mb-4">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Connection
        </button>
        
        <button 
          onClick={testSignup}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Signup
        </button>
      </div>
      
      {testResult && (
        <div className="p-3 bg-white rounded border">
          <strong>Result:</strong> {testResult}
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-600">
        <p>• Connection test checks if Supabase is reachable</p>
        <p>• Signup test creates a test user (temporary email)</p>
        <p>• Check browser console for detailed errors</p>
      </div>
    </div>
  );
}