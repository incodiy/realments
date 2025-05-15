<?php
namespace Incodiy\Realments;

class Realments
{
    protected $fields = [];
    protected $action = '';
    protected $method = 'POST';
    protected $framework = 'tailwind';

    /**
     * Open a form with given attributes (action, method, etc).
     */
    public function open($attributes = [])
    {
        $this->action    = $attributes['action'] ?? '';
        $this->method    = $attributes['method'] ?? 'POST';
        $this->framework = config('realments.framework', 'tailwind');
        return $this;
    }

    /**
     * Close the form: prepare data and return HTML for React.
     */
    public function close()
    {
        // Prepare data to pass to React
        $data = [
            'fields'    => $this->fields,
            'action'    => $this->action,
            'method'    => $this->method,
            'framework' => $this->framework,
            'errors'    => session('errors') ? session('errors')->getMessages() : [],
            'old'       => session()->getOldInput(),
            'classes'   => config("realments.{$this->framework}")
        ];

        // Reset fields for reuse
        $this->fields = [];
        $this->action = '';
        $this->method = 'POST';
        $this->framework = config('realments.framework', 'tailwind');

        // Encode data safely for JavaScript with htmlspecialchars
        $jsonData = htmlspecialchars(json_encode($data), ENT_QUOTES, 'UTF-8');

        // Decode the HTML entities back to normal characters for JSON.parse
        $jsonData = htmlspecialchars_decode($jsonData, ENT_QUOTES);

        // Return container and mounting scripts
        return <<<HTML
<div id="realmentsForm"></div>

<!-- Load React and ReactDOM first -->
<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

<script>
    // Pass data to React via a global variable
    window.realmentsData = JSON.parse('{$jsonData}');
</script>
<script src="/vendor/realments/js/realments.js"></script>
<!-- <script>
    // Render the React form into the container
    ReactDOM.render(
        React.createElement(Realments, window.realmentsData),
        document.getElementById('realmentsForm')
    );
</script> -->
HTML;
    }

    /**
     * Add a field definition to the form.
     */
    protected function addField($type, $name, $attrs)
    {
        $field = [
            'type'        => $type,
            'name'        => $name,
            'label'       => $attrs['label'] ?? ucfirst($name),
            'placeholder' => $attrs['placeholder'] ?? '',
            'add'         => $attrs['add'] ?? false,
            'max'         => $attrs['max'] ?? null,
            'position'    => $attrs['position'] ?? 'bottom',
            'options'     => $attrs['options'] ?? [],
        ];

        // Handle old input or default values
        if ($field['add']) {
            // For dynamic fields, expect an array of values
            $oldValues = session()->getOldInput($name, []);
            if (!is_array($oldValues) || empty($oldValues)) {
                $field['value'] = [''];
            } else {
                $field['value'] = $oldValues;
            }
        } else {
            // Single value
            $field['value'] = session()->getOldInput($name, $attrs['value'] ?? '');
        }

        $this->fields[] = $field;
        return $this;
    }

    // Define methods for each input type
    public function text($name, $attrs = [])      { return $this->addField('text', $name, $attrs); }
    public function email($name, $attrs = [])     { return $this->addField('email', $name, $attrs); }
    public function password($name, $attrs = [])  { return $this->addField('password', $name, $attrs); }
    public function number($name, $attrs = [])    { return $this->addField('number', $name, $attrs); }
    public function date($name, $attrs = [])      { return $this->addField('date', $name, $attrs); }
    public function textarea($name, $attrs = [])  { return $this->addField('textarea', $name, $attrs); }
    public function select($name, $attrs = [])    { return $this->addField('select', $name, $attrs); }
    public function file($name, $attrs = [])      { return $this->addField('file', $name, $attrs); }
    public function checkbox($name, $attrs = [])  { return $this->addField('checkbox', $name, $attrs); }
    public function radio($name, $attrs = [])     { return $this->addField('radio', $name, $attrs); }
}
