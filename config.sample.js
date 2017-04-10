module.exports = {
  'main_port': 3000,
  'worker_port': 3001,
  'heartbeat_interval': 5000,
  'get_job_interval': 5000,
  'free_job_interval': 5000,
  'heartbeat_timeout': 10000,
  'mongodb': {
    'uri': 'mongodb://127.0.0.1/qspider',
    'options': {
      'server': {
        'poolSize': 5
      },
      'config': {
        'autoIndex': false
      }
    }
  }
};
