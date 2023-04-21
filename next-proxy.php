<?php
/**
 * Template Name: Next.js Proxy
 */

require_once(__DIR__ . '/vendor/autoload.php');

use Http\Client\HttpClient;
use Http\Adapter\Guzzle6\Client as GuzzleAdapter;
use Http\Message\MessageFactory\GuzzleMessageFactory;
use Http\Message\StreamFactory\GuzzleStreamFactory;
use Kevinrob\GuzzleCache\CacheMiddleware;
use Kevinrob\GuzzleCache\Storage\WordPressCacheStorage;
use Kevinrob\GuzzleCache\Strategy\PrivateCacheStrategy;
use Kevinrob\GuzzleCache\Strategy\GreedyCacheStrategy;

$base_uri = 'https://obi-wan-v:3000/';

$client = new GuzzleAdapter(new HttpClient());
$message_factory = new GuzzleMessageFactory();
$stream_factory = new GuzzleStreamFactory();

$stack = \GuzzleHttp\HandlerStack::create();
$stack->push(
    new CacheMiddleware(
        new GreedyCacheStrategy(
            new WordPressCacheStorage(),
            3600 // 1 hour cache
        )
    ),
    'cache'
);

$response = $client->sendRequest(
    $message_factory->createRequest(
        $_SERVER['REQUEST_METHOD'],
        $base_uri . $_SERVER['REQUEST_URI'],
        array_merge(
            \GuzzleHttp\Psr7\parse_header($_SERVER['HTTP_HOST']),
            \GuzzleHttp\Psr7\parse_header($_SERVER['HTTP_USER_AGENT'])
        ),
        file_get_contents('php://input')
    )
);

http_response_code($response->getStatusCode());
foreach ($response->getHeaders() as $name => $values) {
    header($name . ': ' . implode(', ', $values));
}
echo (string)$response->getBody();
