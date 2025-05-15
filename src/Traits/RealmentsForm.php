<?php
namespace Incodiy\Realments\Traits;

trait RealmentsForm
{
    protected $fields = [];
    protected $formAttributes = [];

    public function open($attrs = [])
    {
        $this->formAttributes = $attrs;

        // Set default classes jika belum ada
        if (!isset($this->formAttributes['classes'])) {
            $this->formAttributes['classes'] = [
                'input'  => 'border border-gray-300 p-2 rounded w-full',
                'label'  => 'block font-medium mb-1',
                'error'  => 'text-red-600 text-sm mt-1',
                'button' => 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded',
            ];
        }

        // Errors default kosong jika tidak ada
        if (!isset($this->formAttributes['errors'])) {
            $this->formAttributes['errors'] = [];
        }

        return $this;
    }

    protected function addField($type, $name, $attrs = [])
    {
        $attrs['type'] = $type;
        $attrs['name'] = $name;

        if (isset($attrs['addable'])) {
            $attrs['add'] = $attrs['addable'];
            unset($attrs['addable']);
        }

        $this->fields[] = $attrs;

        return $this;
    }

    public function text($name, $attrs = [])    { return $this->addField('text', $name, $attrs); }
    public function email($name, $attrs = [])   { return $this->addField('email', $name, $attrs); }
    public function password($name, $attrs = []){ return $this->addField('password', $name, $attrs); }
    public function number($name, $attrs = [])  { return $this->addField('number', $name, $attrs); }
    public function date($name, $attrs = [])    { return $this->addField('date', $name, $attrs); }
    public function textarea($name, $attrs = []){ return $this->addField('textarea', $name, $attrs); }
    public function select($name, $attrs = [])  { return $this->addField('select', $name, $attrs); }
    public function file($name, $attrs = [])    { return $this->addField('file', $name, $attrs); }
    public function checkbox($name, $attrs = []){ return $this->addField('checkbox', $name, $attrs); }
    public function radio($name, $attrs = [])   { return $this->addField('radio', $name, $attrs); }

    public function close($submitLabel = 'Submit')
    {
        $this->formAttributes['submitLabel'] = $submitLabel;

        // Set final data for render
        $data = [
            'action'      => $this->formAttributes['action'] ?? '',
            'method'      => $this->formAttributes['method'] ?? 'POST',
            'fields'      => $this->fields,
            'errors'      => $this->formAttributes['errors'] ?? [],
            'classes'     => $this->formAttributes['classes'] ?? [
                'input'  => 'border border-gray-300 p-2 rounded w-full',
                'label'  => 'block font-medium mb-1',
                'error'  => 'text-red-600 text-sm mt-1',
                'button' => 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded',
            ],
            'submitLabel' => $submitLabel,
        ];

        $this->formAttributes = $data;

        return $this;
    }

    public function render()
    {
        // Return html + script for React to consume
        return '<script>window.realmentsData = ' . json_encode($this->formAttributes) . ';</script><div id="realmentsForm"></div>';
    }

    // Optional: getter fields dan formAttributes, kalau mau manual akses
    public function getFields()
    {
        return $this->fields;
    }

    public function getFormAttributes()
    {
        return $this->formAttributes;
    }
}
