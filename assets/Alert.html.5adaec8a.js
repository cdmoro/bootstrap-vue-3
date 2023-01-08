const e=JSON.parse(`{"key":"v-59a6f746","path":"/components/Alert.html","title":"Alert","lang":"en-US","frontmatter":{},"excerpt":"","headers":[{"level":2,"title":"Overview","slug":"overview","children":[{"level":3,"title":"v-model Support","slug":"v-model-support","children":[]}]},{"level":2,"title":"Contextual Variants","slug":"contextual-variants","children":[{"level":3,"title":"Conveying Meaning to Assistive Technologies","slug":"conveying-meaning-to-assistive-technologies","children":[]}]},{"level":2,"title":"Additional Content Inside Alerts","slug":"additional-content-inside-alerts","children":[{"level":3,"title":"Color of Links Within Alerts","slug":"color-of-links-within-alerts","children":[]}]},{"level":2,"title":"Dismissible Alerts","slug":"dismissible-alerts","children":[]},{"level":2,"title":"Auto-dismissing Alerts","slug":"auto-dismissing-alerts","children":[{"level":3,"title":"Exposed functions","slug":"exposed-functions","children":[]},{"level":3,"title":"Timer Props","slug":"timer-props","children":[]}]}],"git":{"updatedTime":1673196652000},"filePathRelative":"components/Alert.md","componentReference":{"$schema":"./schema.json","name":"@bootstrap-vue-next/alert","version":"Alpha","meta":{"title":"Alert","description":"Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.","components":[{"component":"BAlert","props":[{"prop":"dismissLabel","type":"string","description":"Value for the 'aria-label' attribute on the dismiss button"},{"prop":"dismissible","type":"Booleanish","description":"When set, enables the dismiss close button","default":"abc"},{"description":"","prop":"modelValue","type":"boolean | number"},{"prop":"fade","type":"Booleanish","description":"When set to true, enables the fade animation/transition on the component"},{"prop":"variant","type":"ColorVariant","description":"Applies one of the Bootstrap theme color variants to the component"}],"slots":[],"emits":[{"args":[],"emit":"dismissed","description":"Alert dismissed either via the dismiss close button or when the dismiss countdown has expired"},{"emit":"close-countdown","description":"Content to place in the alert","args":[{"arg":"closeCountdown","description":"Time remaining on the timer","type":"number"}]},{"emit":"update:modelValue","description":"Standard event to update the v-model","args":[{"arg":"update:modelValue","description":"modelValue","type":"boolean | number"}]}]}]}}}`);export{e as data};
