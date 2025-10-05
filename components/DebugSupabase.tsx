import { useEffect, useState } from 'react';

export default function DebugSupabase() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const debugEnvironment = () => {
      const info = {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
        urlPrefix: import.meta.env.VITE_SUPABASE_URL?.startsWith('https://') ? 'Valid HTTPS' : 'Invalid protocol',
        urlFormat: import.meta.env.VITE_SUPABASE_URL?.includes('.supabase.co') ? 'Valid Supabase URL' : 'Invalid URL format',
        keyFormat: import.meta.env.VITE_SUPABASE_ANONKey?.startsWith('eyJ') ? 'Valid JWT format' : 'Invalid key format',
        envMode: import.meta.env.MODE,
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD
      };

      setDebugInfo(info);
      setLoading(false);
    };

    debugEnvironment();
  }, []);

  if (loading) {
    return <div className="p-4">Loading debug info...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="font-bold text-lg mb-2">🔍 Supabase Debug Information</h3>
      <div className="space-y-2 text-sm">
        <div>
          <strong>Supabase URL:</strong> {debugInfo.supabaseUrl || 'Not found'}
        </div>
        <div>
          <strong>Supabase Key:</strong> {debugInfo.supabaseAnonKey}
        </div>
        <div>
          <strong>URL Protocol:</strong> {debugInfo.urlPrefix}
        </div>
        <div>
          <strong>URL Format:</strong> {debugInfo.urlFormat}
        </div>
        <div>
          <strong>Key Format:</strong> {debugInfo.keyFormat}
        </div>
        <div>
          <strong>Environment:</strong> {debugInfo.envMode}
        </div>
        <div>
          <strong>Is Development:</strong> {debugInfo.isDev ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Is Production:</strong> {debugInfo.isProd ? 'Yes' : 'No'}
        </div>
      </div>
      
      <div className="mt-4 p-2 bg-yellow-100 rounded">
        <strong>🚨 If you see issues:</strong>
        <ul className="list-disc list-inside mt-1">
          <li>URL should be like: https://your-project.supabase.co</li>
          <li>Key should start with eyJhbGciOiJIUzI1NiIs...</li>
          <li>Environment variables must be set in Vercel dashboard</li>
          <li>Redeploy after changing environment variables</li>
        </ul>
      </div>
    </div>
  );
}