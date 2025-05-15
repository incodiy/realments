<?php
namespace Incodiy\Realments\Traits;

trait RealmentsForm
{
    public function open($attrs = [])
    {
        app('realments')->open($attrs);
        return $this;
    }

    public function close()
    {
        return app('realments')->close();
    }

    public function text($name, $attrs = [])
    {
        app('realments')->text($name, $attrs);
        return $this;
    }

    public function email($name, $attrs = [])
    {
        app('realments')->email($name, $attrs);
        return $this;
    }

    public function password($name, $attrs = [])
    {
        app('realments')->password($name, $attrs);
        return $this;
    }

    public function number($name, $attrs = [])
    {
        app('realments')->number($name, $attrs);
        return $this;
    }

    public function date($name, $attrs = [])
    {
        app('realments')->date($name, $attrs);
        return $this;
    }

    public function textarea($name, $attrs = [])
    {
        app('realments')->textarea($name, $attrs);
        return $this;
    }

    public function select($name, $attrs = [])
    {
        app('realments')->select($name, $attrs);
        return $this;
    }

    public function file($name, $attrs = [])
    {
        app('realments')->file($name, $attrs);
        return $this;
    }

    public function checkbox($name, $attrs = [])
    {
        app('realments')->checkbox($name, $attrs);
        return $this;
    }

    public function radio($name, $attrs = [])
    {
        app('realments')->radio($name, $attrs);
        return $this;
    }
}
