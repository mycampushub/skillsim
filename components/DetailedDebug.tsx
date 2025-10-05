import { useEffect, useState } from 'react';

export default function DetailedDebug() {
  const [envInfo, setEnvInfo] = useState<any>({});

  useEffect(() => {
    // Check all possible environment variable sources
    const info = {
      // Vite environment variables
      viteSupabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      viteSupabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      
      // Check if they exist
      hasUrl: !!import.meta.env.VITE_SUPABASE_URL,
      hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      
      // Check lengths
      urlLength: import.meta.env.VITE_SUPABASE_URL?.length || 0,
      keyLength: import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0,
      
      // Check formats
      urlStartsWithHttps: import.meta.env.VITE_SUPABASE_URL?.startsWith('https://'),
      urlEndsWithSupabase: import.meta.env.VITE_SUPABASE_URL?.endsWith('.supabase.co'),
      keyStartsWithEyJ: import.meta.env.VITE_SUPABASE_ANON_KEY?.startsWith('eyJ'),
      
      // Environment info
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      
      // All env vars (for debugging - don't do this in production!)
      allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')),
    };

    setEnvInfo(info);
  }, []);

  return (
    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-4">
      <h3 className="font-bold text-lg mb-2 text-red-800">🚨 Detailed Environment Debug</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold text-red-700">URL Information:</h4>
          <div className="space-y-1">
            <div><strong>Value:</strong> {envInfo.viteSupabaseUrl || 'NULL'}</div>
            <div><strong>Exists:</strong> {envInfo.hasUrl ? '✅ YES' : '❌ NO'}</div>
            <div><strong>Length:</strong> {envInfo.urlLength}</div>
            <div><strong>Starts with https:</strong> {envInfo.urlStartsWithHttps ? '✅' : '❌'}</div>
            <div><strong>Ends with .supabase.co:</strong> {envInfo.urlEndsWithSupabase ? '✅' : '❌'}</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-red-700">Key Information:</h4>
          <div className="space-y-1">
            <div><strong>Value:</strong> {envInfo.viteSupabaseKey ? `${envInfo.viteSupabaseKey.substring(0, 20)}...` : 'NULL'}</div>
            <div><strong>Exists:</strong> {envInfo.hasKey ? '✅ YES' : '❌ NO'}</div>
            <div><strong>Length:</strong> {envInfo.keyLength}</div>
            <div><strong>Starts with eyJ:</strong> {envInfo.keyStartsWithEyJ ? '✅' : '❌'}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-semibold text-red-700">Environment:</h4>
        <div className="space-y-1">
          <div><strong>Mode:</strong> {envInfo.mode}</div>
          <div><strong>Is Dev:</strong> {envInfo.dev ? 'YES' : 'NO'}</div>
          <div><strong>Is Prod:</strong> {envInfo.prod ? 'YES' : 'NO'}</div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-semibold text-red-700">All VITE_ Variables Found:</h4>
        <div className="text-xs space-y-1">
          {envInfo.allEnvVars?.map((varName: string) => (
            <div key={varName}>• {varName}</div>
          )) || 'None found'}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-red-100 rounded">
        <strong className="text-red-800">🔍 Issues Found:</strong>
        <ul className="list-disc list-inside mt-2 text-red-700">
          {!envInfo.hasUrl && <li>❌ VITE_SUPABASE_URL not found</li>}
          {!envInfo.hasKey && <li>❌ VITE_SUPABASE_ANON_KEY not found</li>}
          {envInfo.hasUrl && !envInfo.urlStartsWithHttps && <li>❌ URL doesn't start with https://</li>}
          {envInfo.hasUrl && !envInfo.urlEndsWithSupabase && <li>❌ URL doesn't end with .supabase.co</li>}
          {envInfo.hasKey && !envInfo.keyStartsWithEyJ && <li>❌ Key doesn't start with eyJ (wrong format)</li>}
          {envInfo.keyLength > 0 && envInfo.keyLength < 100 && <li>❌ Key too short (should be 200+ characters)</li>}
        </ul>
        
        {!envInfo.hasUrl || !envInfo.hasKey ? (
          <div className="mt-3 p-2 bg-red-200 rounded text-red-800">
            <strong>🚨 CRITICAL: Environment variables not loaded!</strong>
            <br />Check Vercel Settings → Environment Variables
          </div>
        ) : (
          <div className="mt-3 p-2 bg-green-200 rounded text-green-800">
            <strong>✅ Environment variables loaded successfully!</strong>
          </div>
        )}
      </div>
    </div>
  );
}