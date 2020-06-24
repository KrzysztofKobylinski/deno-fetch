import * as log from 'http://deno.land/std/log/mod.ts'

interface Launch {
  flightNumber: number;
  mission: string;
}
const launches = new Map<number, Launch>();

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
  for (const launch of launchData) {
    const flightData = {
      flightNumber: launch['flight_number'],
      mission: launch['mission_name'],
    };
    launches.set(flightData.flightNumber, flightData)
    log.info(JSON.stringify(flightData))
  }
}

await downloadLaunchData();