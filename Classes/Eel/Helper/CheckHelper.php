<?php

namespace Sitegeist\CookieOptIn\Eel\Helper;

use Neos\Flow\Annotations as Flow;
use Neos\Eel\ProtectedContextAwareInterface;

/*
 * exampleNecessaryValue    = ${Sitegeist.CookieOptIn.Check.necessary()}
 * exampleMarketingValue    = ${Sitegeist.CookieOptIn.Check.marketing()}
 * exampleStatisticValue    = ${Sitegeist.CookieOptIn.Check.statistic()}
 * exampleAllValue          = ${Sitegeist.CookieOptIn.Check.all()}
 */

class CheckHelper implements ProtectedContextAwareInterface {

    public function necessary() : bool {
        return $this->checkCookie('necessary-opt-in');
    }

    public function marketing() : bool {
        return $this->checkCookie('marketing-opt-in');
    }

    public function statistic() : bool {
        return $this->checkCookie('statistic-opt-in');
    }

    private function checkCookie(string $cookie) : bool {
        if(!isset($_COOKIE[$cookie])) {
            return false;
        }

        return ($_COOKIE[$cookie] === 'true');
    }

    /**
     * @param string $methodName
     * @return boolean
     */
    public function allowsCallOfMethod($methodName) {
        return true;
    }
}
