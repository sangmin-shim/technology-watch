/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // ... other config options
  serverDependenciesToBundle: [
    // Bundle @supabase/supabase-js and its dependencies
    /@supabase\/supabase-js/,
    /realtime-js/,
    // Bundle rxjs
    /rxjs/,
  ],
}; 