<?php

abstract class AbstractUnit {

    protected $name;
    protected $unit_type;
    protected $variant;
    protected $floor;
    protected $building;

    protected abstract function get_unit_type();

}