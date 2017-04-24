'use strict';
module.exports = {
  UNSUPPORT_ROLE: role => `不支持的角色:${role}!`,
  TASK_NOT_FOUND: (task_id) => `任务不存在:${task_id}`,
  JOB_NOT_FOUND_INSIDE_TASK: (task_id, job_file) => `任务${task_id}中不存在4{job_file}`
};
