<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => Str::random(7),
            'image' => null,
            'description' => $this->faker->text,
            'extra_info' => $this->faker->text,
            'tags' => $this->craeteTags($this->faker->text),
        ];
    }

    private function craeteTags($str)
    {
        $str = str_replace('.', '', $str); // remove dots
        $str = str_replace(' ', '#', $str); // replace space characters with hash tags

        return '#' . $str;
    }
}
