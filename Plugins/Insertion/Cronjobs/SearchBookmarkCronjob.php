<?php

namespace Insertion\Cronjobs;

use Doctrine\ORM\Mapping as ORM;
use Oforge\Engine\Modules\Core\Annotation\ORM\Discriminator\DiscriminatorEntry;
use Oforge\Engine\Modules\Cronjob\Enums\ExecutionInterval;
use Oforge\Engine\Modules\Cronjob\Models\CommandCronjob;


/**
 * Class SearchBookmarkCronjob
 * @ORM\Entity
 * @DiscriminatorEntry()
 * @package Insertion\Cronjobs
 */
class SearchBookmarkCronjob extends CommandCronjob {
    /**
     * SearchBookmarkCronjob constructor.
     *
     * @throws \Doctrine\ORM\ORMException
     * @throws \ReflectionException
     */
    public function __construct() {

        parent::__construct();
        $this->fromArray([
            'name'              => 'oforge:insertion:searchBookmark',
            'title'             => 'Send notification mails for new insertions of search bookmark',
            'executionInterval' => ExecutionInterval::DAILY,
            'command'           => 'oforge:plugin:insertion:searchBookmark',
        ]);
    }
}
