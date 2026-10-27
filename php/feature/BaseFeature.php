<?php
declare(strict_types=1);

// OpenMindfulness SDK base feature

class OpenMindfulnessBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenMindfulnessContext $ctx, array $options): void {}
    public function PostConstruct(OpenMindfulnessContext $ctx): void {}
    public function PostConstructEntity(OpenMindfulnessContext $ctx): void {}
    public function SetData(OpenMindfulnessContext $ctx): void {}
    public function GetData(OpenMindfulnessContext $ctx): void {}
    public function GetMatch(OpenMindfulnessContext $ctx): void {}
    public function SetMatch(OpenMindfulnessContext $ctx): void {}
    public function PrePoint(OpenMindfulnessContext $ctx): void {}
    public function PreSpec(OpenMindfulnessContext $ctx): void {}
    public function PreRequest(OpenMindfulnessContext $ctx): void {}
    public function PreResponse(OpenMindfulnessContext $ctx): void {}
    public function PreResult(OpenMindfulnessContext $ctx): void {}
    public function PreDone(OpenMindfulnessContext $ctx): void {}
    public function PreUnexpected(OpenMindfulnessContext $ctx): void {}
}
