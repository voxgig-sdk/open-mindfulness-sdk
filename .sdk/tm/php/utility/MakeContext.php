<?php
declare(strict_types=1);

// OpenMindfulness SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenMindfulnessMakeContext
{
    public static function call(array $ctxmap, ?OpenMindfulnessContext $basectx): OpenMindfulnessContext
    {
        return new OpenMindfulnessContext($ctxmap, $basectx);
    }
}
