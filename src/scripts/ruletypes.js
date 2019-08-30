const ruleTypes = {};

ruleTypes['Toogle Show'] = {
  toConfig(rule, fields, ruleConditions) {
    if (
      !fields[rule.condition_field] ||
      !rule.condition_type ||
      !ruleConditions[rule.condition_type] ||
      !ruleConditions[rule.condition_type].toConfig
    ) {
      return '';
    }

    const body = `
      if (${ruleConditions[rule.condition_type].toConfig(rule, fields)}) {
        ${rule.action_target.map(function(target) {
          return "document.getElementById('" + target + "Element').classList.remove('hide');";
        })}
      } else {
        ${rule.action_target.map(function(target) {
          return "document.getElementById('" + target + "Element').classList.add('hide');";
        })}
      }
    `;

    return `
      options.model.on('change:${fields[rule.condition_field]}', function() {
        ${body}
      });
      ${body}
    `;
  }
};

ruleTypes['Toogle Hide'] = {
  toConfig(rule, fields, ruleConditions) {
    if (
      !fields[rule.condition_field] ||
      !rule.condition_type ||
      !ruleConditions[rule.condition_type] ||
      !ruleConditions[rule.condition_type].toConfig
    ) {
      return '';
    }

    const body = `
      if (${ruleConditions[rule.condition_type].toConfig(rule, fields)}) {
        ${rule.action_target.map(function(target) {
          return "document.getElementById('" + target + "Element').classList.add('hide');";
        })}
      } else {
        ${rule.action_target.map(function(target) {
          return "document.getElementById('" + target + "Element').classList.remove('hide');";
        })}
      }
    `;

    return `
      options.model.on('change:${fields[rule.condition_field]}', function() {
        ${body}
      });
      ${body}
    `;
  }
};

const ruleConditions = {};

ruleConditions['Is Empty'] = {
  inputs: {},

  toConfig(rule, fields) {
    if (!fields[rule.condition_field]) {
      return '';
    }

    return `!options.model.has('${fields[rule.condition_field]}') || !options.model.get('${fields[rule.condition_field]}')`;
  }
};

ruleConditions['Is Not Empty'] = {
  inputs: {},

  toConfig(rule, fields) {
    if (!fields[rule.condition_field]) {
      return '';
    }

    return `options.model.has('${fields[rule.condition_field]}') && options.model.get('${fields[rule.condition_field]}')`;
  }
};

ruleConditions['Is Equal To'] = {
  inputs: {
    condition_value_1: 'Value'
  },

  toConfig(rule, fields) {
    if (!fields[rule.condition_field]) {
      return '';
    }

    return `options.model.get('${fields[rule.condition_field]}') === options.model.get('condition_value_1')`;
  }
};

ruleConditions['Is Greater Than'] = {
  inputs: {
    condition_value_1: 'Value'
  },

  toConfig(rule, fields) {
    if (!fields[rule.condition_field]) {
      return '';
    }

    return `options.model.get('${fields[rule.condition_field]}') > options.model.get('condition_value_1')`;
  }
};

ruleConditions['Is Less Than'] = {
  inputs: {
    condition_value_1: 'Value'
  },

  toConfig(rule, fields) {
    if (!fields[rule.condition_field]) {
      return '';
    }

    return `options.model.get('${fields[rule.condition_field]}') < options.model.get('condition_value_1')`;
  }
};

ruleConditions['Is Between'] = {
  inputs: {
    condition_value_1: 'Min',
    condition_value_2: 'Max'
  },

  toConfig(rule, fields) {
    if (!fields[rule.condition_field]) {
      return '';
    }

    return `options.model.get('${
      fields[rule.condition_field]
    }') > options.model.get('condition_value_1') && options.model.get('${
      fields[rule.condition_field]
    }') < options.model.get('condition_value_2')`;
  }
};
