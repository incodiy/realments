@isset($realmentForms)
  @if (!empty($realmentForms))
    {!! $realmentForms !!}
    @include('realments.scripts')
  @endif
@endisset
