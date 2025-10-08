<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            [
                'name' => 'Fantasy',
                'description' => 'Stories featuring magic, mythical creatures, and otherworldly adventures.',
                'image' => 'hat-wizard',
            ],
            [
                'name' => 'Science Fiction',
                'description' => 'Explores futuristic science, space travel, and advanced technology.',
                'image' => 'robot',
            ],
            [
                'name' => 'Horror',
                'description' => 'Fiction designed to instill fear, dread, or unease.',
                'image' => 'ghost',
            ],
            [
                'name' => 'Mystery',
                'description' => 'Centers on solving crimes, puzzles, or uncovering secrets.',
                'image' => 'user-secret',
            ],
            [
                'name' => 'Thriller / Suspense',
                'description' => 'Fast-paced stories with tension, excitement, and psychological twists.',
                'image' => 'heartbeat',
            ],
            [
                'name' => 'Romance',
                'description' => 'Stories focused on love, relationships, and emotional connection.',
                'image' => 'heart',
            ],
            [
                'name' => 'Historical Fiction',
                'description' => 'Fiction set in the past, blending real events with imaginative storytelling.',
                'image' => 'landmark',
            ],
            [
                'name' => 'Adventure',
                'description' => 'Action-packed tales of exploration, survival, and excitement.',
                'image' => 'compass',
            ],
            [
                'name' => 'Drama',
                'description' => 'Realistic stories emphasizing character development and emotion.',
                'image' => 'theater-masks',
            ],
            [
                'name' => 'Dystopian / Post-Apocalyptic',
                'description' => 'Depicts societies in decline or after catastrophic events.',
                'image' => 'skull',
            ],
            [
                'name' => 'Biography',
                'description' => 'Narratives detailing the lives and achievements of real people.',
                'image' => 'user-tie',
            ],
            [
                'name' => 'Self-Help / Inspirational',
                'description' => 'Books offering guidance, motivation, and personal growth advice.',
                'image' => 'lightbulb',
            ],
            [
                'name' => 'True Crime',
                'description' => 'Accounts of real criminal cases and investigations.',
                'image' => 'gavel',
            ],
            [
                'name' => 'Dark Fantasy',
                'description' => 'Combines fantasy with horror and morally complex themes.',
                'image' => 'dragon',
            ],
            [
                'name' => 'Paranormal Romance',
                'description' => 'Romantic stories involving supernatural beings or phenomena.',
                'image' => 'moon',
            ],
            [
                'name' => 'Cyberpunk',
                'description' => 'High-tech, dystopian tales mixing digital worlds and rebellion.',
                'image' => 'microchip',
            ],
            [
                'name' => 'Epic / High Fantasy',
                'description' => 'Large-scale fantasy with sprawling worlds and heroic quests.',
                'image' => 'crown',
            ],
            [
                'name' => 'Slice of Life',
                'description' => 'Depicts everyday experiences and the beauty of ordinary moments.',
                'image' => 'mug-hot',
            ],
            [
                'name' => 'Comedy',
                'description' => 'Stories crafted to entertain and make readers laugh.',
                'image' => 'laugh',
            ],
        ];

        foreach ($genres as $genre) {
            Genre::factory()->create($genre);
        }
    }
}
