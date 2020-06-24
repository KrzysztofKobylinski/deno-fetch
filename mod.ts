import * as log from 'http://deno.land/std/log/mod.ts'

log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    default: {
      level: 'DEBUG',
      handlers: ['console'],
    },
  }
})
async function downloadLaunchData() {
  log.info('downloading launch data...')
  const response = await fetch('https://api.spacexdata.com/v3/launches', {
    method: 'GET',
  });

  if (!response.ok) {
    log.warning('Problem downloading launch data');
    throw new Error('launch data download failed');
  }

  const launchData = await response.json();
  // console.log(launchData)
}

await downloadLaunchData();