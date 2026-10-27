<?php
declare(strict_types=1);

// OpenMindfulness SDK utility: result_headers

class OpenMindfulnessResultHeaders
{
    public static function call(OpenMindfulnessContext $ctx): ?OpenMindfulnessResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
