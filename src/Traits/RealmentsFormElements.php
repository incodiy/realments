<?php

namespace Incodiy\Realments\Traits;

trait RealmentsFormElements
{
    protected array $formElements = [];

    public function open(array $attributes = []): void
    {
        $this->formElements[] = [
            'type' => 'form_open',
            'attributes' => $attributes
        ];
    }

    public function close(array $options = []): \Illuminate\Http\JsonResponse
    {
        $this->formElements[] = [
            'type' => 'form_close',
            'options' => $options
        ];

        return response()->json(['form' => $this->formElements]);
    }

    public function text(string $name, array $attributes = []): void
    {
        $this->addElement('text', $name, $attributes);
    }

    public function email(string $name, array $attributes = []): void
    {
        $this->addElement('email', $name, $attributes);
    }

    public function password(string $name, array $attributes = []): void
    {
        $this->addElement('password', $name, $attributes);
    }

    public function number(string $name, array $attributes = []): void
    {
        $this->addElement('number', $name, $attributes);
    }

    public function date(string $name, array $attributes = []): void
    {
        $this->addElement('date', $name, $attributes);
    }

    public function file(string $name, array $attributes = []): void
    {
        $this->addElement('file', $name, $attributes);
    }

    public function textarea(string $name, array $attributes = []): void
    {
        $this->addElement('textarea', $name, $attributes);
    }

    public function checkbox(string $name, array $values = [], array $attributes = []): void
    {
        $this->formElements[] = [
            'type' => 'checkbox',
            'name' => $name,
            'values' => $values,
            'attributes' => $attributes
        ];
    }

    public function radio(string $name, array $values = [], array $attributes = []): void
    {
        $this->formElements[] = [
            'type' => 'radio',
            'name' => $name,
            'values' => $values,
            'attributes' => $attributes
        ];
    }

    public function select(string $name, array $values, array $attributes = []): void
    {
        $this->formElements[] = [
            'type' => 'select',
            'name' => $name,
            'values' => $values,
            'attributes' => $attributes
        ];
    }

    protected function addElement(string $type, string $name, array $attributes = []): void
    {
        $this->formElements[] = [
            'type' => $type,
            'name' => $name,
            'attributes' => $attributes
        ];
    }
}
